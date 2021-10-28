import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  FormGroup,
  Alert,
} from "reactstrap";
import axios from "axios";

const api = "http://localhost:3001";

export default function LupaPassword() {
  const [data, setData] = useState({
    id: "",
    lupa_password: "",
  });
  const [anggota, setanggota] = useState([]);
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setData({
      lupa_password: 1,
    });
  }, []);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  const submit = async (e) => {
    e.preventDefault();
    axios
      .put(api + "/lupaPassword", data)
      .then((res) => {
        console.log(data);
        const myData = [...anggota, res.data.values, visible];
        setanggota(myData);
        setVisible(myData);
        setData({
          id: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center">
        <strong>INFORMASI LUPA KATA SANDI</strong>
      </h3>
      <h5 className="text-center">PRIMKOPAL AAL SURABAYA</h5>
      <Card className="mt-4">
        <Container>
          <Row className="mt-5 ml-5">
            <Col>
              <h4>
                <b>Lupa Kata Sandi</b>
              </h4>
              <hr />
            </Col>
          </Row>
          <Form onSubmit={submit}>
            <FormGroup>
              <Row className="ml-5 mr-5 text-justify">
                <Col>
                  <Input
                    name="id"
                    id="id"
                    value={data.id}
                    onChange={(e) => handle(e)}
                    placeholder="Masukkan NIP/NRP Anda"
                    required
                  />
                </Col>
                <Col>
                  {" "}
                  <Button color="primary" type="submit">
                    Reset Kata Sandi
                  </Button>
                </Col>
              </Row>
              <Row className="ml-5 mr-5 mt-3">
                <Col>
                  <Alert color="info" isOpen={visible} toggle={onDismiss}>
                    Reset password anda diproses.
                  </Alert>
                </Col>
              </Row>
            </FormGroup>
          </Form>
          <Row className="ml-5 mr-5 mb-2 text-justify">
            <Col>
              <p>
                Dengan menekan tombol reset kata sandi maka akan terbuka pilihan
                untuk administrator mereset kata sandi anda. Langkah selanjutnya
                yang anda harus lakukan adalah menghubungi pihak pengurus
                Primkopal AAL Surabaya melalui kontak yang tertera pada halaman
                utama dengan format sebagai berikut.
              </p>
            </Col>
          </Row>
          <Row className="ml-5 mr-5 mb-3 text-justify">
            <Col>
              <strong>
                Nama &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;: <br />
                NIP/NRP &ensp;&ensp;&ensp;: <br />
                Satuan Kerja : <br />
                <br />
                Permintaan reset kata sandi.
              </strong>
            </Col>
          </Row>
          <Row className="ml-5 mr-5 mt-2 mb-5 text-justify">
            <Col>
              <p>
                Selanjutnya tunggu konfirmasi dari pihak pengurus Primkopal AAL
                Surabaya. Apabila sudah mendapat konfirmasi, silahkan masuk
                dengan menggunakan kode yang sudah diberikan dan mengganti kode
                tersebut dengan kata sandi yang baru.
              </p>
            </Col>
          </Row>
        </Container>
      </Card>
    </Container>
  );
}
