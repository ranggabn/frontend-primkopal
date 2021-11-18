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
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const api = "http://localhost:3001";

export default function EditStatusPinjaman(props) {
  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [pinjam, setpinjam] = useState([]);
  const [data, setData] = useState({});
  const [cicilan, setCicilan] = useState([]);
  const [viewPdf, setviewPdf] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    axios.get(api + "/tampilCicilan/").then((res) => {
      setCicilan(res.data.values);
    });
  }, []);
  const cicil = cicilan.map((cicil) => cicil);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampilPinjaman/" + id);
      response = await response.data.values[0];
      setData(response);
      setviewPdf(response.persyaratan)
    }
    getData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(api + "/ubahPinjaman", data)
      .catch((err) => console.error(err));
    setpinjam(data);
    props.history.push("/pinjamsementara");
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  if (data) {
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
              <Label>Lama Cicilan</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="id_cicil"
                      value={data.id_cicil}
                      defaultValue={"DEFAULT"}
                      onChange={(e) => handle(e)}
                      disabled
                    >
                      <option value="DEFAULT" disabled>
                        Pilih Cicilan
                      </option>
                      {cicil.map((cicil, key) => (
                        <option key={key} value={cicil.id_cicilan}>
                          {cicil.cicilan} Bulan
                        </option>
                      ))}
                    </Input>
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
              <Label>Status Kaprim</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="status_kaprim"
                      value={data.status_kaprim}
                      onChange={(e) => handle(e)}
                    >
                      <option value="0">Belum Disetujui</option>
                      <option value="1">Disetujui</option>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <Label>Status Kasatker</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="status_kasatker"
                      value={data.status_kasatker}
                      onChange={(e) => handle(e)}
                    >
                      <option value="0">Belum Disetujui</option>
                      <option value="1">Disetujui</option>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <br></br>
              <h4>File Persyaratan</h4>
              <div className="pdf-container">
                {viewPdf && (
                  <>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={viewPdf}
                        plugins={[defaultLayoutPluginInstance]}
                      />
                    </Worker>
                  </>
                )}
                {!viewPdf && <>No PDF file selected</>}
              </div>
              <FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Button
                            className="fa fa-chevron-left mt-3"
                            type="button"
                            href="/pinjamsementara"
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
}
