import React, { useState, useContext, useEffect } from "react";
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
import { getBase64 } from "../../../Util/GetBase64";

const api = "http://localhost:3001";

export default function TambahBarang() {
  const [barang, setBarang] = useState([]);
  const [data, setData] = useState({
    nama: "",
    harga: "",
    stok: "",
    gambar: "",
    keterangan: "",
    id_kategori: "",
    id_status: "",
  });

  const [statusSelect, setStatusSelect] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilStatus").then((res) => {
      setStatusSelect(res.data.values);
    });
  }, []);
  const ss = statusSelect.map((ss) => ss);

  const [kategoriSelect, setkategoriSelect] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilKategori").then((res) => {
      setkategoriSelect(res.data.values);
    });
  }, []);
  const ks = kategoriSelect.map((ks) => ks);

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  function submit(e) {
    axios.post(api + "/tambahBarang", data).then((res) => {
      console.log(res.data.values);
      const myData = [...barang, res.data.values, visible];
      setBarang(myData);
      setVisible(myData);
      e.preventDefault();
      setData({
        nama: "",
        harga: "",
        stok: "",
        gambar: "",
        keterangan: "",
        id_kategori: "",
        id_status: "",
      })
    });    
  }

  async function handleUploadImage(e) {
    e.preventDefault()
    // console.log(Array.from(e.target.files)[0]);
    let temporary =  Array.from(e.target.files)[0];
    let result = await getBase64(temporary)
    setData({...data,gambar:result});
  }

  function handle(e) {
    e.preventDefault()
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
      <h4>Formulir Tambah Data Barang</h4>
      <hr />
      <Form className="form" onSubmit={(e) => submit(e)}>
        <Col>
          <Label>Nama</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="text"
                  name="nama"
                  value={data.nama}
                  onChange={(e) => handle(e)}
                  placeholder="Nama Barang"
                />
              </Col>
            </Row>
          </FormGroup>
          <Label>Harga</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="number"
                  name="harga"
                  value={data.harga}
                  onChange={(e) => handle(e)}
                  placeholder="Harga Barang"
                />
              </Col>
            </Row>
          </FormGroup>
          <Label>Stok</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="number"
                  name="stok"
                  value={data.stok}
                  onChange={(e) => handle(e)}
                  placeholder="Stok Barang"
                />
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
                  placeholder="Keterangan Barang"
                />
              </Col>
            </Row>
          </FormGroup>
          <Label>Kategori</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="select"
                  name="id_kategori"
                  value={data.id_kategori}
                  onChange={(e) => handle(e)}
                >
                  <option value="" disabled selected>
                    Pilih Kategori
                  </option>
                  {ks.map((ks, key) => (
                    <option key={key} value={ks.id}>
                      {ks.kategori_barang}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <Label>Status</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="select"
                  name="id_status"
                  value={data.id_status}
                  onChange={(e) => handle(e)}
                >
                  <option value="" disabled selected>
                    Pilih Status
                  </option>
                  {ss.map((ss, key) => (
                    <option key={key} value={ss.id_status}>
                      {ss.status_barang}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <Label>Gambar</Label>
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
          <Alert color="info" isOpen={visible} toggle={onDismiss}>
            Berhasil Ditambahkan!
          </Alert>
          <Row>
            <Col>
              <FormGroup>
                <Row>
                  <Col>
                    <Button
                      className="fa fa-chevron-left mt-3"
                      type="button"
                      href="/daftarbarang"
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
    </Container>
  );
}
