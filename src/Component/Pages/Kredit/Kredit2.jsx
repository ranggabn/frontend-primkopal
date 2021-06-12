import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Card,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function Kredit2(props) {
  const { state } = useContext(AuthContext);
  const [kredit, setKredit] = useState([]);
  const [data, setData] = useState({
    id_cicilan: "",
    cicil: "",
  });

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [cicilan, setCicilan] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilCicilan").then((res) => {
      setCicilan(res.data.values);
    });
  }, []);
  const cicil = cicilan.map((cicil) => cicil);

  function submit(e) {
    axios.post(api + "/tambahKredit", data).then((res) => {
      console.log(res.data.values);
      const myData = [...kredit, res.data.values, visible];
      setKredit(myData);
      setVisible(myData);
      e.preventDefault();
    });
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
      <br />
      <h3 className="text-center">
        <b>PERMOHONAN KREDIT</b>
      </h3>
      <h6 className="text-center">(SEPEDA / BARANG / ELEKTRONIK)</h6>
      <Card className="mt-5">
        <Form className="form mt-4 mb-4" onSubmit={(e) => submit(e)}>
          <Col>
            <Label>Pilih Lama Cicilan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="id_cicilan"
                    value={data.id_cicilan}
                    onChange={(e) => handle(e)}
                  >
                    <option value="" disabled selected>
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
                    onChange={(e) => handle(e)}
                    disabled
                  />
                </Col>
              </Row>
            </FormGroup>
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
              Kredit berhasil diajukan, Untuk informasi lebih lengkap silahkan
              dilihat pada halaman data Kredit!
            </Alert>
            <Row>
              <Col>
                <FormGroup>
                  <Row>
                    <Col>
                      <Button
                        className="fa fa-chevron-left mt-3"
                        type="button"
                        href="/kredit"
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
                        Ajukan Kredit{" "}
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
