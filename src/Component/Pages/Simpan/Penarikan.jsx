import React, { useState, useContext } from "react";
import {
  Container,
  Alert,
  Col,
  Form,
  Button,
  FormGroup,
  Row,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function Penarikan() {
  const [penarikan, setPenarikan] = useState([]);
  const [data, setData] = useState({
    id_user: "",
    penarikan: "",
    terbilang: "",
    keterangan: "",
    tanggal_simpan: "",
  });
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  function submit(e) {
    e.preventDefault();
    axios.post(api + "/tambahPenarikan", data).then((res) => {
      const myData = [...penarikan, res.data.values, visible];
      setPenarikan(myData);
      setVisible(myData);
      setData({
        id_user: "",
        penarikan: "",
        terbilang: "",
        keterangan: "",
        tanggal_simpan: "",
      });
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h4>Formulir Penarikan Dana</h4>
      <hr />
      <Form className="form" onSubmit={(e) => submit(e)}>
        <Col>
          <Label>NIP / NRP</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="number"
                  name="id_user"
                  value={data.id_user}
                  onChange={(e) => handle(e)}
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Label>Jumlah Penarikan Dana</Label>
                <Input
                  type="number"
                  name="penarikan"
                  value={data.penarikan}
                  onChange={(e) => handle(e)}
                  placeholder="Rp. "
                  required
                />
              </Col>
              <Col>
                <Label>Terbilang</Label>
                <FormGroup>
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        name="terbilang"
                        value={data.terbilang}
                        onChange={(e) => handle(e)}
                        required
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <Label>Keterangan</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="textarea"
                  name="keterangan"
                  value={data.keterangan}
                  onChange={(e) => handle(e)}
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <Label>Tanggal Penarikan</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="date"
                  name="tanggal_simpan"
                  value={data.tanggal_simpan}
                  onChange={(e) => handle(e)}
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <Alert color="info" isOpen={visible} toggle={onDismiss}>
            Data Penarikan Dana Berhasil Ditambahkan!
          </Alert>
          <Row>
            <Col>
              <FormGroup>
                <Row>
                  <Col>
                    <Button
                      className="fa fa-chevron-left mt-3"
                      type="button"
                      href="/daftarsimpanan"
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
                    <Button
                      color="primary"
                      className="mt-3 float-right"
                      type="submit"
                    >
                      {" "}
                      Simpan{" "}
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Form>
    </Container>
  );
}
