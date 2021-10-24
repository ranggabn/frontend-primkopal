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
  Alert,
  Card,
} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";
import moment from "moment";

const api = "http://localhost:3001";

export default function Kredit1(props) {
  const { state } = useContext(AuthContext);
  const [kredit, setKredit] = useState([]);
  const [data, setData] = useState({
    id_user: "",
    id_status: "",
    id_cicilan: "",
    nama_barang: "",
    harga: "",
    terbilang: "",
    besar_cicilan: "",
    tanggal_kredit: "",
  });
  const [databaru, setdatabaru] = useState({    
    nama_barang: "",      
  })
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [listbarang, setlistbarang] = useState([]);
  const [cicilan, setCicilan] = useState([]);
  const cicil = cicilan.map((cicil) => cicil);

  useEffect(() => {
    setData({
      id_user: state.id,
      tanggal_kredit: moment().format("YYYY-MM-DD"),
      id_status: 1,
      cicil: 1999
    });
    axios.get(api + "/tampilCicilan").then((res) => {
      setCicilan(res.data.values);
    });
    axios.get(api + "/tampilBarang").then((res) => {
      setlistbarang(res.data.values);
    });
  }, []);

  function submit(e) {
    axios.post(api + "/tambahKredit", data).then((res) => {
      console.log(res.data.values);
      const myData = [...kredit, res.data.values, visible];
      setKredit(myData);
      setVisible(myData);
      e.preventDefault();
      setData({
        id_cicilan: "",
        nama_barang: "",
        harga: "",
        terbilang: "",
        besar_cicilan: ""
      });
    });
  }

  const arr = [];
  listbarang.map((lb) =>
    arr.push({ value: lb.nama, label: lb.nama, harga: lb.harga})
  );

  const handleChange = (e) => {    
    setData({
      nama_barang: e.value,
      harga: e.harga
    });    
    setdatabaru({      
      nama_barang: e.value,
    })
  };

  let besarCicilan;
  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    besarCicilan = parseInt(data.harga, 10) / parseInt(newData.id_cicilan, 10) + parseInt(data.harga, 10) * 0.01;
    console.log(data.harga);
    console.log(besarCicilan);
    setData({...newData, besar_cicilan:besarCicilan})
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
            <Label>Satuan Kerja</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="satker"
                    value={state.satker}
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
                    value={state.nomor_telefon}
                    onChange={(e) => handle(e)}
                    required
                  />
                </Col>
              </Row>
            </FormGroup>
            <Label>Nama Barang</Label>
            <FormGroup>
            <Row>
              <Col>
                <Select
                  name="nama_barang"                  
                  onChange={(e) => handleChange(e)}
                  options={arr}
                  placeholder=" "
                  required
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
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label>Lama Cicilan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="id_cicilan"
                    value={data.id_cicilan}
                    onChange={(e) => handle(e)}
                    required
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
                    name="besar_cicilan"
                    value={data.besar_cicilan}
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
            <FormGroup>
              <Row>
                <Col>
                  <Button
                    color="primary"
                    className="mt-3 float-right"
                    type="submit"                    
                  >
                    {" "}
                    Ajukan Kredit{" "}
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
