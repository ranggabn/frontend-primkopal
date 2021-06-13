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

export default function EditKredit(props) {
  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [kredit, setKredit] = useState([]);
  const [data, setData] = useState({
    id_user: "",
    id_status: "",
    id_cicil: "",
    satker: "",
    nomor_telefon: "",
    nama_barang: "",
    harga: "",
    terbilang: "",
    cicil: "",
    tanggal_kredit: "",
  });

  useEffect(() => {
    setData({
      id_status: 1,
    });
  }, []);

  const [cicilan, setCicilan] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilCicilan/").then((res) => {
      setCicilan(res.data.values);
    });
  }, []);
  const cicil = cicilan.map((cicil) => cicil);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampilKredit/" + id);
      response = await response.data.values[0];
      setData(response);
    }
    getData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(api + "/ubahKredit", data)
      .catch((err) => console.error(err));
    setKredit(data);
    props.history.push("/daftarKredit");
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
            <b>KREDIT PRIMKOPAL AAL</b>
          </h3>
          <h6 className="text-center">(SEPEDA / BARANG / ELEKTRONIK)</h6>
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
                    name="nama"
                    value={data.username}
                    onChange={(e) => handle(e)}
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
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Nama Barang</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="nama_barang"
                    value={data.nama_barang}
                    onChange={(e) => handle(e)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Row>
              <Col>
                <Label>Harga Barang</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="harga"
                    value={data.harga}
                    onChange={(e) => handle(e)}
                    placeholder="Rp."
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
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label>Pilih Lama Cicilan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="id_cicil"
                    value={data.id_cicil}
                    defaultValue={"DEFAULT"}
                    onChange={(e) => handle(e)}
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
                    name="cicil"
                    value={data.cicil}
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Row>
                    <Col>
                      <Button
                        className="fa fa-chevron-left mt-3"
                        type="button"
                        href="/daftarkredit"
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
                        onClick={(e) => submit(e)}
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
      </Card>
    </Container>
  );
}
