import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  FormGroup,
  Row,
  Label,
  Input,
  Card,
  CardImg,
  Alert,
} from "reactstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";
import moment from "moment";
import { getBase64 } from "../../../Util/GetBase64";

const api = "http://localhost:3001";
const qs = require("querystring");

export default function EditAnggota(props) {
  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [anggota, setanggota] = useState([]);
  const [newImage, setnewImage] = useState("");
  const [data, setData] = useState({
    id: "",
    username: "",
    satker: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_telefon: "",
    role: "",
  });
  const [role, setrole] = useState([]);
  const [disable, setdisable] = useState({
    isDisabled: true,
    noDisabled: false,
  });
  const [dataReset, setdataReset] = useState({
    id: "",
    currpassword: "",
    newpassword: "",
    lupa_password: "",
    errorMessage: null,
    successMessage: null,
  });

  useEffect(() => {
    axios.get(api + "/tampilRole").then((res) => {
      setrole(res.data.values);
    });
    async function getData() {
      let response = await axios.get(api + "/tampil/" + id);
      response = response.data.values[0];
      setData(response);
    }
    getData();
    axios.get(api + "/tampilpassword/" + id).then((res) => {
      setdataReset({
        id: res.data.values[0].id,
        currpassword: res.data.values[0].password,
        newpassword: res.data.values[0].id,
        lupa_password: 0
      });
    });
  }, []);
  const roles = role.map((roles) => roles);

  async function handleUploadImage(e) {
    e.preventDefault();
    // console.log(Array.from(e.target.files)[0]);
    let temporary = Array.from(e.target.files)[0];
    let result = await getBase64(temporary);
    setnewImage(result);
    setanggota({ ...anggota, bukti_transfer: result });
  }

  const handle = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.put(api + "/ubah", data).catch((err) => console.error(err));
    setanggota(data);
    props.history.push("/daftaranggota");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setdataReset({
      ...dataReset,
      errorMessage: null,
      successMessage: null,
    });

    const requestBody = {
      id: data.id,
      currpassword: dataReset.currpassword,
      newpassword: dataReset.newpassword,
      lupa_password: dataReset.lupa_password
    };
    console.log(requestBody);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(
        api + "/auth/api/v1/resetpassword",
        qs.stringify(requestBody),
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setdataReset({
            successMessage: res.data.message,
            errorMessage: null,
          });
        } else {
          setdataReset({
            ...dataReset,
            errorMessage: res.data.message,
            successMessage: null,
          });
        }
        throw res;
      });
  };

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3 className="text-center">
            <b>EDIT ANGGOTA</b>
          </h3>
        </Col>
      </Row>
      <Card className="container mt-5">
        <Row>
          <Col>
            <Form className="mt-4" onSubmit={submit}>
              <Label>Nama Lengkap</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="username"
                      value={data.username}
                      onChange={handle("username")}
                      disabled
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>NRP / NIP</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="id"
                      value={data.id}
                      onChange={handle("id")}
                      disabled
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>Satuan Kerja</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="satker"
                      value={data.satker}
                      onChange={handle("satker")}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col>
                  <Label>Tempat Lahir</Label>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Input
                          type="text"
                          name="tempat_lahir"
                          value={data.tempat_lahir}
                          onChange={handle("tempat_lahir")}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col>
                  <Label>Tanggal Lahir</Label>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Input
                          type="date"
                          name="tanggal_lahir"
                          value={moment(data.tanggal_lahir).format(
                            "YYYY-MM-DD"
                          )}
                          onChange={handle("tanggal_lahir")}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Label>No. HP / Telefon</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="number"
                      name="nomor_telefon"
                      value={data.nomor_telefon}
                      onChange={handle("nomor_telefon")}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>Jenis Keanggotaan</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="role"
                      value={data.role}
                      onChange={handle("role")}
                    >
                      <option value="" disabled selected>
                        Pilih Role
                      </option>
                      {roles.map((roles, key) => (
                        <option key={key} value={roles.id_role}>
                          {roles.nama_role}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <Label>Bukti Transfer</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="file"
                      name="bukti_transfer"
                      onChange={(e) => handleUploadImage(e)}
                    />
                    <br />
                    <Row>
                      <Col xs="6" sm="4">
                        <CardImg
                          src={data.bukti_transfer || newImage}
                          alt="bukti_transfer"
                          width={300}
                          height={300}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Button
                            className="fa fa-chevron-left mt-3"
                            type="button"
                            href="/daftaranggota"
                          >
                            {" "}
                            Kembali{" "}
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Row>
                        <Col>
                          {dataReset.successMessage && (
                            <div className="alert alert-success" role="alert">
                              {dataReset.successMessage}
                            </div>
                          )}
                          {dataReset.errorMessage && (
                            <div className="alert alert-danger" role="alert">
                              {dataReset.errorMessage}
                            </div>
                          )}
                          <Button
                            className="mt-3"
                            type="button"
                            color="danger"
                            onClick={handleFormSubmit}
                            block
                            disabled={
                              data.lupa_password
                                ? disable.noDisabled
                                : disable.isDisabled
                            }
                          >
                            {" "}
                            Reset Kata Sandi{" "}
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button
                      color="primary"
                      className="mt-3 float-right"
                      type="button"
                      onClick={submit}
                    >
                      {" "}
                      Simpan{" "}
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
