import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Button,  
} from "reactstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function Simpan(props) {
  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [simpanan, setsimpanan] = useState([]);
  const [data, setData] = useState({
    id: "",
    id_user: "",
    jumlah_simpanan: "",
    terbilang: "",
    tanggal_simpan: "",
  });

  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampilSimpanan/" + id);
      response = await response.data.values[0];
      setData(response);
    }
    getData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(api + "/ubahSimpanan", data)
      .catch((err) => console.error(err));
    setsimpanan(data);
    props.history.push("/daftarsimpanan");
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
            <b>FORMULIR SIMPANAN SUKARELA</b>
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
                      name="nama"
                      value={state.user}
                      onChange={handle("nama")}
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
                      name="id_user"
                      value={data.id_user}
                      onChange={handle("id_user")}
                      disabled
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col>
                  <Label>Jumlah Simpanan</Label>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Input
                          type="number"
                          name="jumlah_simpanan"
                          value={data.jumlah_simpanan}
                          onChange={handle("jumlah_simpanan")}
                          placeholder="Rp."
                        />
                      </Col>
                    </Row>
                  </FormGroup>
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
                          onChange={handle("terbilang")}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <hr />
              <p className="text-center">UNTUK SIMPANAN SUKARELA</p>
              <p className="text-center">SILAHKAN TRANSFER KE NOMOR REKENING</p>
              <p className="text-center">
                <b>34343241212341 BANK BTN (A.N PRIMKOPAL AAL SURABAYA)</b>
              </p>
              <hr />
              <FormGroup>
                <Label for="bukti_transfer">Unggah Bukti Transfer</Label>
                <Input
                  type="file"
                  name="bukti_transfer"
                  value=""
                  onChange={(e) => handle(e)}
                  accept="image/*"
                />
              </FormGroup>
              <hr />
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
                          type="button"
                          onClick={submit}
                        >
                          {" "}
                          Simpan{" "}
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
