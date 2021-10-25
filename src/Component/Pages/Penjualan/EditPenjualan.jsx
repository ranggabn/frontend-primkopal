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
  const [penjualan, setpenjualan] = useState([])
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampilPenjualan/" + id);
      response = await response.data.values[0];
      setData(response);
    }
    getData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios.put(api + "/ubahPenjualan", data).catch((err) => console.error(err));
    setpenjualan(data);
    props.history.push("/daftarpenjualan");
  };

  const handle = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  if (data) {
    return (
      <Container className="mt-5">
        <h4>Formulir Edit Data Penjualan</h4>
        <hr />
        <Form className="form" onSubmit={submit}>
          <Col>
            <Label>Nama Barang</Label>
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
            <Label>Nama Pembeli</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={handle("username")}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>NIP / NRP</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="id_user"
                    value={data.id_user}
                    onChange={handle("id_user")}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Jumlah Barang</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="jumlah"
                    value={data.jumlah}
                    onChange={handle("jumlah")}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Jumlah Harga</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="jumlah_harga"
                    value={data.jumlah_harga}
                    onChange={handle("jumlah_harga")}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Status</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="status"
                    value={data.status}
                    onChange={handle("status")}
                  >
                    <option value="0">Hutang</option>
                    <option value="1">Lunas</option>
                  </Input>
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
                        type="submit"
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
}
