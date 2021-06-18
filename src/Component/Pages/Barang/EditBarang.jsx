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
import { getBase64 } from "../../../Util/GetBase64";

const api = "http://localhost:3001";

export default function EditBarang(props) {
  let { id } = useParams();
  const [barang, setbarang] = useState([]);
  const [data, setData] = useState({});
  const [newImage, setnewImage] = useState("");

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

  useEffect(() => {
    async function getData() {
      let response = await axios.get(api + "/tampilBarang/" + id);
      response = response.data.values[0];
      setData(response);
    }
    getData();
  }, []);

  // console.log(data.gambar);

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(api + "/ubahBarang", data)
      .catch((err) => console.error(err));
    setbarang(data);
    props.history.push("/daftarbarang");
  };

  async function handleUploadImage(e) {
    e.preventDefault();
    // console.log(Array.from(e.target.files)[0]);
    let temporary = Array.from(e.target.files)[0];
    let result = await getBase64(temporary);
    setnewImage(result);
    setData({...data,gambar:result});
    // setData({...data, gambar : newImage});
    // console.log(data.gambar);  
  }

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
        <h4>Formulir Edit Data Barang</h4>
        <hr />
        {/* <Alert color="info" isOpen={visible} toggle={onDismiss}>
          Berhasil Diubah!
        </Alert> */}
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
            <Label>Harga</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="harga"
                    value={data.harga}
                    onChange={handle("harga")}
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
                    defaultValue={"DEFAULT"}
                    onChange={handle("id_kategori")}
                  >
                    <option value="DEFAULT" disabled>
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
                    defaultValue={"DEFAULT"}
                    onChange={handle("id_status")}
                  >
                    <option value="DEFAULT" disabled>
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
            <Label>Keterangan</Label>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="keterangan"
                    value={data.keterangan}
                    onChange={handle("keterangan")}
                  />
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
                  <img
                    src={data.gambar || newImage}
                    alt="gambar"
                    width={200}
                    height={200}
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
}
