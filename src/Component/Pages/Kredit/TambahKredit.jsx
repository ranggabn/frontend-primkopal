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

export default function TambahKredit() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [data, setData] = useState({
    nim: "",
    nama: "",
    jurusan: "",
  });

  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  function submit(e) {
    e.preventDefault();
    axios.post(api + "/tambah", data).then((res) => {
      console.log(res.data.values);
      const myData = [...mahasiswa, res.data.values, visible];
      setMahasiswa(myData);
      setVisible(myData)
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  const { state } = useContext(AuthContext);
  
  if(!state.isAuthenticated){
    return <Redirect to="/masuk"/>
  }
  return (
    <Container className="mt-5">
      <h4>Formulir Tambah Data Anggota</h4>
      <hr />
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        Berhasil Ditambahkan!
      </Alert>
      <Form className="form" onSubmit={(e) => submit(e)}>
        <Col>
          <Label>NIM</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="text"
                  name="nim"
                  value={data.nim}
                  onChange={(e) => handle(e)}
                  placeholder="Masukkan NIM"
                />
              </Col>
            </Row>
          </FormGroup>
          <Label>Nama</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="text"
                  name="nama"
                  value={data.nama}
                  onChange={(e) => handle(e)}
                  placeholder="Masukkan Nama"
                />
              </Col>
            </Row>
          </FormGroup>
          <Label>Jurusan</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="text"
                  name="jurusan"
                  value={data.jurusan}
                  onChange={(e) => handle(e)}
                  placeholder="Masukkan Jurusan"
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
                      href="/daftaranggota"
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
