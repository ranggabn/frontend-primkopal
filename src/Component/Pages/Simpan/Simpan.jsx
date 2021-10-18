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
  Alert,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";
import moment from "moment";
import { getBase64 } from "../../../Util/GetBase64";

const api = "http://localhost:3001";

export default function Simpan() {
  const { state } = useContext(AuthContext);
  const [simpanan, setsimpanan] = useState([]);
  const [data, setData] = useState({
    id_user: "",
    jumlah_simpanan: "",
    terbilang: "",
    tanggal_simpan: "",
  });
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setData({
      id_user: state.id,
      tanggal_simpan: moment().format(),
    });
  }, []);

  function submit(e) {
    axios.post(api + "/tambahSimpanan", data).then((res) => {
      console.log(res.data.values);
      const myData = [...simpanan, res.data.values, visible];
      setsimpanan(myData);
      setVisible(myData);
      e.preventDefault();
      setData({        
        jumlah_simpanan: "",
        terbilang: "",
        tanggal_simpan: "",
      });
    });
  }

  async function handleUploadImage(e) {
    e.preventDefault()
    // console.log(Array.from(e.target.files)[0]);
    let temporary =  Array.from(e.target.files)[0];
    let result = await getBase64(temporary)
    setData({...data,bukti_transfer:result});
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

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
            <Form className="mt-4" onSubmit={(e) => submit(e)}>
              <Label>Nama Lengkap</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="nama"
                      value={state.user}
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
                          onChange={(e) => handle(e)}
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
                          onChange={(e) => handle(e)}
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
                  onChange={(e) => handleUploadImage(e)}
                  accept="image/*"
                />
              </FormGroup>
              <hr />
              <Alert color="info" isOpen={visible} toggle={onDismiss}>
                Simpanan Sukarela Berhasil!
              </Alert>
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
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
