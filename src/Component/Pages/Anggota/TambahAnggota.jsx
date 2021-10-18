import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Input,
  Alert,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import moment from "moment";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function TambahAnggota() {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [data, setData] = useState({
    username: "",
    id: "",
    satker: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_telefon: "",
    password: "",
    password_ulang: "",
    role: "",
    tanggal_daftar: "",
    error: {},
  });
  const [role, setrole] = useState([]);
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    axios.get(api + "/tampilRole").then((res) => {
      setrole(res.data.values);
    });
    setData({
      tanggal_lahir: moment(state.tanggal_lahir).format("YYYY-MM-DD"),
      tanggal_daftar: moment().format("YYYY-MM-DD"),
    });
  }, []);
  const roles = role.map((roles) => roles);
  const [retype, setretype] = useState("");
  const submit = async (e) => {
    axios
      .post(api + "/tambahAnggota", data)
      .then((res) => {
        const myData = [...user, res.data.values, visible];
        setUser(myData);
        setVisible(myData);
        e.preventDefault();
        setData({
          username: "",
          id: "",
          satker: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          nomor_telefon: "",
          password: "",
          password_ulang: "",
          role: "",
        });
      })
      .catch((error) => console.log(error));
  };

  function handle(e) {
    if (data.password !== e.target.value) {
      setretype("Password anda tidak sama");
    } else {
      setretype("");
    }
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3 className="text-center">
            <b>TAMBAH ANGGOTA</b>
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
                      onChange={(e) => handle(e)}
                      required
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
                      onChange={(e) => handle(e)}
                      required
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
                      onChange={(e) => handle(e)}
                      required
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
                          onChange={(e) => handle(e)}
                          required
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
                          value={data.tanggal_lahir}
                          onChange={(e) => handle(e)}
                          required
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
                      onChange={(e) => handle(e)}
                      required
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>Kata Sandi</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={(e) => handle(e)}
                      required
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>Ulangi Kata Sandi</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="password"
                      name="password_ulang"
                      value={data.password_ulang}
                      onChange={(e) => handle(e)}
                      required
                      invalid={retype ? true : false}
                    />
                    <FormFeedback>{retype}</FormFeedback>
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
                      onChange={(e) => handle(e)}
                      required
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
              <Alert color="info" isOpen={visible} toggle={onDismiss}>
                Data Berhasil Ditambahkan!
              </Alert>
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
                      type="submit"
                    >
                      {" "}
                      Tambah Anggota{" "}
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
