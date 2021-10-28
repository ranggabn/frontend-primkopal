import React from "react";
import { useState, useEffect } from "react";
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
import moment from "moment";
import { getBase64 } from "../../../Util/GetBase64";

const api = "http://localhost:3001";

export default function Daftar() {
  const [user, setUser] = useState([]);
  const [state, setState] = useState({
    username: "",
    id: "",
    satker: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_telefon: "",
    password: "",
    password_ulang: "",
    bukti_transfer: "",
  });
  const [response, setresponse] = useState("");

  const [retype, setretype] = useState("");

  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setState({
      tanggal_lahir: moment(state.tanggal_lahir).format("YYYY-MM-DD"),
    });
  }, []);

  const submit = async (e) => {
    axios.post(api + "/auth/api/v1/register", state).then((res) => {
      console.log(res.data.values);
      setresponse(res.data.values);
      const myData = [...user, res.data.values, visible];
      setUser(myData);
      setVisible(myData);
      e.preventDefault();
      setState({
        username: "",
        id: "",
        satker: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nomor_telefon: "",
        password: "",
        password_ulang: "",
        bukti_transfer: "",
      });
    });
  };

  async function handleUploadImage(e) {
    e.preventDefault();
    // console.log(Array.from(e.target.files)[0]);
    let temporary = Array.from(e.target.files)[0];
    let result = await getBase64(temporary);
    setState({ ...state, bukti_transfer: result });
  }

  function handle(e) {
    if (state.password !== e.target.value) {
      setretype("Password anda tidak sama");
    } else {
      setretype("");
    }
    const newData = { ...state };
    newData[e.target.name] = e.target.value;
    setState(newData);
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3 className="text-center">
            <b>DAFTAR ANGGOTA</b>
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
                      value={state.username}
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
                      value={state.id}
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
                      value={state.satker}
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
                          value={state.tempat_lahir}
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
                          value={state.tanggal_lahir}
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
                      value={state.nomor_telefon}
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
                      value={state.password}
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
                      value={state.password_ulang}
                      onChange={(e) => handle(e)}
                      invalid={retype ? true : false}
                      required
                    />
                    <FormFeedback>{retype}</FormFeedback>
                  </Col>
                </Row>
              </FormGroup>
              <hr />
              <p className="text-center">UNTUK PENDAFTARAN ANGGOTA</p>
              <p className="text-center">
                SILAHKAN MEMBAYAR IURAN WAJIB SEJUMLAH RP 10.000
              </p>
              <p className="text-center">
                PEMBAYARAN BISA DILAKUKAN DENGAN TRANSFER KE NOMOR REKENING
              </p>
              <p className="text-center">
                <b>34343241212341 BANK BTN (A.N PRIMKOPAL AAL SURABAYA)</b>
              </p>
              <hr />
              <FormGroup>
                <Label for="bukti_transfer">Unggah Bukti Transfer</Label>
                <Input
                  type="file"
                  name="bukti_transfer"
                  onChange={(e) => handleUploadImage(e)}
                  accept="image/*"
                />
              </FormGroup>
              <hr />
              <Alert color="info" isOpen={visible} toggle={onDismiss}>
                {response}
              </Alert>
              <FormGroup>
                <Row>
                  <Col>
                    <Button
                      color="primary"
                      className="mt-3 float-right"
                      type="submit"
                    >
                      {" "}
                      Daftar{" "}
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
