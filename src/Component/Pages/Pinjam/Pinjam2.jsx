import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Button,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";
import moment from "moment";
import { getBase64 } from "../../../Util/GetBase64";

const api = "http://localhost:3001";

export default function Pinjam2() {
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
    tanggal_pinjam: "",
    besar_cicilan: "",
    nama: "",
  });
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setData({
      tanggal_pinjam: moment().format("YYYY-MM-DD"),
      id_status: 1,
      id_user: state.id,
      satker: state.satker,
      nomor_telefon: state.nomor_telefon
    });
  }, []);

  const [cicilan, setCicilan] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilCicilan").then((res) => {
      setCicilan(res.data.values);
    });
  }, []);
  const cicil = cicilan.map((cicil) => cicil);

  function submit(e) {
    axios.post(api + "/tambahPinjaman", data).then((res) => {
      console.log(res.data.values);
      const myData = [...pinjam, res.data.values, visible];
      setpinjam(myData);
      setVisible(myData);
      e.preventDefault();
      setData({
        id_cicil: "",
        satker: "",
        nomor_telefon: "",
        besar_pinjaman: "",
        terbilang: "",
        keperluan: "",
        tanggal_pinjam: "",
        besar_cicilan: "",
      });
    });
  }

  let besarCicilan;
  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    besarCicilan =
      parseInt(newData.besar_pinjaman, 10) / parseInt(newData.id_cicil, 10) +
      parseInt(newData.besar_pinjaman, 10) * 0.01;
    console.log(newData.besar_pinjaman, newData.id_cicil);
    setData({ ...newData, besar_cicilan: besarCicilan });
  }

  async function handleUploadImage(e) {
    e.preventDefault();
    let temporary = Array.from(e.target.files)[0];
    let result = await getBase64(temporary);
    setData({ ...data, [e.target.value]: result });
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
      <Card className="container mt-5">
        <Form className="form mt-4 mb-4" onSubmit={(e) => submit(e)}>
          <Col>
            <Label>Nama Lengkap</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="nama"
                    value={state.user}
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
            <Row>
              <Col>
                <Label>Besar Pinjaman</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="besar_pinjaman"
                    value={data.besar_pinjaman}
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
            <Label>Keperluan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="keperluan"
                    value={data.keperluan}
                    onChange={(e) => handle(e)}
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
                    onChange={(e) => handle(e)}
                  >
                    <option value="" disabled selected>
                      Pilih Cicilan
                    </option>
                    {cicil.map((cicil, key) => (
                      <option key={key} value={cicil.id_cicil}>
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
            <hr />
            <Label>KTA</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>KTP Pemohon</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>KTP Suami / Istri</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>Slip Gaji</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>Rincian Gaji Juru Bayar</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>Kartu Keluarga Non Dinas</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>Surat Pernyataan Kesehatan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>Asuransi BP Jiwa Asri</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Label>SK Bebas Hutang Bank</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="file"
                    name="gambar"
                    onChange={(e) => handleUploadImage(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
              Pinjaman berhasil diajukan, Untuk informasi lebih lengkap silahkan
              dilihat pada halaman data Pinjaman!
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
                          href="/pinjam"
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
                    Ajukan Pinjaman{" "}
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
