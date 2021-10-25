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
} from "reactstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";
import moment from "moment";

const api = "http://localhost:3001";

export default function EditAnggota(props) {
  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [anggota, setanggota] = useState([]);
  const [data, setData] = useState({
    id: "",
    username: "",
    satker: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_telefon: "",
    role: ""
  });
  const [role, setrole] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilRole").then((res) => {
      setrole(res.data.values);
    });
    async function getData() {
      let response = await axios.get(api + "/tampil/" + id);
      console.log(response.data.values);
      response = response.data.values[0];
      setData(response);
    }
    getData();
  }, []);
  const roles = role.map((roles) => roles);

  const submit = async (e) => {
    e.preventDefault();
    await axios.put(api + "/ubah", data).catch((err) => console.error(err));
    setanggota(data);
    props.history.push("/daftaranggota");
  };

  const handle = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
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
