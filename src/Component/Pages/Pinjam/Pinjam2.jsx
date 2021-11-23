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
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

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
    persyaratan: "",
    tanggal_pinjam: "",
    besar_cicilan: "",
    nama: "",
  });
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [cicilan, setCicilan] = useState([]);
  const cicil = cicilan.map((cicil) => cicil);

  useEffect(() => {
    setData({
      tanggal_pinjam: moment().format("YYYY-MM-DD"),
      id_status: 1,
      id_user: state.id,
      satker: state.satker,
      nomor_telefon: state.nomor_telefon,
    });
  }, []);

  function submit(e) {
    e.preventDefault();
    axios.post(api + "/tambahPinjaman", data).then((res) => {
      const myData = [...pinjam, res.data.values, visible];
      setpinjam(myData);
      setVisible(myData);
      setData({
        id_cicil: "",
        satker: "",
        nomor_telefon: "",
        besar_pinjaman: "",
        terbilang: "",
        keperluan: "",
        persyaratan: "",
        tanggal_pinjam: "",
        besar_cicilan: "",
      });
    });
  }

  let besarCicilan;
  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    if (newData.besar_pinjaman <= 10000000) {
      axios.get(api + "/tampilCicilan/" + 1).then((res) => {
        setCicilan(res.data.values);
      });
    } else if (
      newData.besar_pinjaman > 10000000 &&
      newData.besar_pinjaman <= 20000000
    ) {
      axios.get(api + "/tampilCicilan2").then((res) => {
        setCicilan(res.data.values);
      });
    } else {
      axios.get(api + "/tampilCicilan/").then((res) => {
        setCicilan(res.data.values);
      });
    }
    besarCicilan =
      parseInt(newData.besar_pinjaman, 10) / parseInt(newData.id_cicil, 10) +
      parseInt(newData.besar_pinjaman, 10) * 0.01;
    setData({ ...newData, besar_cicilan: besarCicilan });
  }

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          // setviewPdf(e.target.result)
          setData({ ...data, persyaratan: e.target.result });
        };
      } else {
        // setviewPdf(null)
      }
    } else {
      console.log("select your file");
    }
  };

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
              <Input
                type="text"
                name="nama"
                id="nama"
                value={state.user}
                onChange={(e) => handle(e)}
                disabled
              />
            </FormGroup>
            <Label>NRP / NIP</Label>
            <FormGroup>
              <Input
                type="text"
                name="id_user"
                id="id_user"
                value={data.id_user}
                onChange={(e) => handle(e)}
                disabled
              />
            </FormGroup>
            <Label>Satuan Kerja</Label>
            <FormGroup>
              <Input
                type="text"
                name="satker"
                id="satker"
                value={data.satker}
                onChange={(e) => handle(e)}
                disabled
              />
            </FormGroup>
            <Label>No. HP / Telefon</Label>
            <FormGroup>
              <Input
                type="number"
                name="nomor_telefon"
                id="nomor_telefon"
                value={data.nomor_telefon}
                onChange={(e) => handle(e)}
                required
              />
            </FormGroup>
            <Row>
              <Col>
                <Label>Besar Pinjaman</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="besar_pinjaman"
                    id="besar_pinjaman"
                    value={data.besar_pinjaman}
                    onChange={(e) => handle(e)}
                    placeholder="Rp."
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <Label>Terbilang</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="terbilang"
                    id="terbilang"
                    value={data.terbilang}
                    onChange={(e) => handle(e)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label>Keperluan</Label>
            <FormGroup>
              <Input
                type="textarea"
                name="keperluan"
                id="keperluan"
                value={data.keperluan}
                onChange={(e) => handle(e)}
                required
              />
            </FormGroup>
            <Label>Lama Cicilan</Label>
            <FormGroup>
              <Input
                type="select"
                name="id_cicil"
                id="id_cicil"
                value={data.id_cicil}
                onChange={(e) => handle(e)}
                required
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
            </FormGroup>
            <Label>Jumlah Cicilan / Bulan</Label>
            <FormGroup>
              <Input
                type="number"
                name="besar_cicilan"
                id="besar_cicilan"
                value={data.besar_cicilan}
                onChange={(e) => handle(e)}
                disabled
              />
            </FormGroup>
            <hr />
            <h4>
              <strong>Persyaratan Pinjaman</strong>
            </h4>
            <p>1. KTA</p>
            <p>2. KTP Pemohon Usipa</p>
            <p>3. KTP suami / istri</p>
            <p>4. Slip gaji</p>
            <p>5. Rincian gaji Juru bayar</p>
            <p>6. KK non dinas</p>
            <p>7. Surat Pernyataan Kesehatan</p>
            <p>8. Formulir Surat Permintaan Asuransi Jiwa BP ASRI</p>
            <p>
              9.{" "}
              <strong>
                Untuk pinjaman Rp 21.000.000,00 s.d. Rp 25.000.000,00
              </strong>{" "}
              melampirkan surat pernyataan bebas hutang bank mengetahui Kepala
              Bagian.
            </p>
            <FormGroup>
              <Input
                type="file"
                name="persyaratan"
                id="persyaratan"
                onChange={(e) => handlePdfFileChange(e)}
                accept="application/pdf"
                required
              />
            </FormGroup>
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
                    type="submit"
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
