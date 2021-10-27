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
  Alert,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";
import moment from "moment";

const api = "http://localhost:3001";

export default function Ubahprofil() {
  // let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [anggota, setanggota] = useState([]);
  const [data, setData] = useState({
    id: state.id,
    username: "",
    satker: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_telefon: "",
    role: "",
  });
  const [role, setrole] = useState([]);
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    axios.get(api + "/tampilRole").then((res) => {
      setrole(res.data.values);
    });
    async function getData() {
      let response = await axios.get(api + "/tampil/" + data.id);
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
    const myData = [...anggota, visible];
    setanggota(data);
    setVisible(myData);
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
            <b>UBAH PROFIL</b>
          </h3>
          <Button
            color="secondary"
            className="mt-4 float-right"
            href="/ubahpassword"
          >
            {" "}
            Ubah Password{" "}
          </Button>
        </Col>
      </Row>
      <Card className="container mt-2">
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
                      onChange={handle("id")}
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
                      onChange={handle("satker")}
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
                          onChange={handle("tempat_lahir")}
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
                          value={moment(data.tanggal_lahir).format(
                            "YYYY-MM-DD"
                          )}
                          onChange={handle("tanggal_lahir")}
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
                      onChange={handle("nomor_telefon")}
                      required
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Alert color="info" isOpen={visible} toggle={onDismiss}>
                Berhasil mengubah data!
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
