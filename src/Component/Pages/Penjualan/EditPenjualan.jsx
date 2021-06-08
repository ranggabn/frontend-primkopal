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
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function EditPenjualan(props) {
  let { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState([]);
  const [data, setData] = useState({
    id: "",
    nim: "",
    nama: "",
    jurusan: "",
  });


  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampil/" + id);
      response = await response.data.values[0];
      setData(response);
    }
    getData();
  }, []);

  const submit = async (e) => {
    e.preventDefault()
    await axios.put(api + "/edit", data).catch((err) => console.error(err));
    setMahasiswa(data);
    props.history.push("/daftarpenjualan")
  };

  const handle = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h4>Formulir Edit Data Penjualan</h4>
      <hr />
      {/* <Alert color="info" isOpen={visible} toggle={onDismiss}>
        Berhasil Diubah!
      </Alert> */}
      <Form className="form" onSubmit={submit}>
        <Col>
          <Label>NIM</Label>
          <FormGroup>
            <Row>
              <Col>
                <Input
                  type="text"
                  name="nim"
                  value={data.nim}
                  onChange={handle("nim")}
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
                  onChange={handle("nama")}
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
                  onChange={handle("jurusan")}
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
                      href="/daftarpenjualan"
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
        </Col>
      </Form>
    </Container>
  );
}
