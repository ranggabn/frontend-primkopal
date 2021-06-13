import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
} from "reactstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function EditStatusPinjaman(props) {
  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [pinjam, setpinjam] = useState([]);
  const [data, setData] = useState({
    id_user: "",
    id_status: "",
    id_cicil: "",
    satker: "",
    nomor_telefon: "",
    besar_pinjaman: "",
    terbilang: "",
    keperluan: "",
    besar_cicilan: "",
  });

  const [status, setStatus] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilStatusKP/").then((res) => {
      setStatus(res.data.values);
    });
  }, []);
  const statusKP = status.map((statusKP) => statusKP);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampilPinjaman/" + id);
      response = await response.data.values[0];
      setData(response);
    }
    getData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(api + "/ubahPinjaman", data)
      .catch((err) => console.error(err));
    setpinjam(data);
    props.history.push("/daftarpinjaman");
  };

  let besarCicilan;
  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    besarCicilan = newData.harga / newData.id_cicil + newData.harga * 0.01;
    // console.log(besarCicilan);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3 className="text-center">
            <b>FORMULIR PERMOHONAN</b>
            <br />
            <b>USIPA PRIMKOPAL AAL</b>
          </h3>
          <h6 className="text-center">(PEMINJAMAN S.D. RP 25.000.000)</h6>
        </Col>
      </Row>
      <Card className="mt-5">
        <Form className="form mt-4 mb-4" onSubmit={(e) => submit(e)}>
          <Col>
            <Label>Nama Lengkap</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={(e) => handle(e)}
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
                    onChange={(e) => handle(e)}
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
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>No. HP / Telefon</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="nomor_telefon"
                    value={data.nomor_telefon}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <Row>
              <Col>
                <Label>Besar Pinjaman</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="besar_pinjaman"
                    value={data.besar_pinjaman}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col>
                <Label>Terbilang</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="terbilang"
                    value={data.terbilang}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label>Keperluan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="keperluan"
                    value={data.keperluan}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="id_cicil"
                    value={data.id_cicil}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Jumlah Cicilan / Bulan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="besar_cicilan"
                    value={data.besar_cicilan}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Ubah Status</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="id_status"
                    value={data.id_status}
                    onChange={(e) => handle(e)}
                  >
                    {statusKP.map((statusKP, key) => (
                      <option key={key} value={statusKP.id_statusKP}>
                        {statusKP.status}
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
                          href="/daftarpinjaman"
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
                    onClick={(e) => submit(e)}
                  >
                    {" "}
                    Simpan{" "}
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Form>
      </Card>
    </Container>
  );
}
