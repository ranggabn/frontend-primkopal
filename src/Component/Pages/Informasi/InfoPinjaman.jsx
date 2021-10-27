import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardImg,
  Row,
  Col,
  FormText,
  Button,
} from "reactstrap";
import pinjam from "./Images/Pinjaman.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import SKGaji from "./File/SKGaji.docx";
import Asuransi from "./File/Asuransi.pdf";

const api = "http://localhost:3001";

export default function InfoPinjaman() {
  const [peraturan, setperaturan] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilPeraturan").then((res) => {
      setperaturan(res.data.values);
    });
  }, []);
  return (
    <Container className="mt-5">
      <h3 className="text-center">
        <strong>INFORMASI PINJAMAN DANA</strong>
      </h3>
      <h5 className="text-center">PRIMKOPAL AAL SURABAYA</h5>
      <Card className="mt-4">
        <Container>
          <Row className="mt-5 ml-5">
            <Col>
              <h4>
                <b>Pinjaman Dana</b>
              </h4>
            </Col>
          </Row>
          <Row className="ml-5 mr-5 mt-2 mb-3 text-justify">
            <Col>
              <p>
                Pinjaman Dana pada website Primkopal AAL Surabaya dapat
                dilakukan dengan mengikuti beberapa langkah yang ada pada
                dibawah ini. Pembayaran cicilan pinjaman dana dilakukan melalui
                pemotongan gaji secara langsung melalui koordinasi antara pihak
                Primkopal AAL Surabaya dan Juru Bayar Gaji.
              </p>
            </Col>
          </Row>
          <Row className="ml-5 mr-5 mt-2">
            <Col className="text-center">
              <h5>Unggah Dokumen Persyaratan Dibawah Ini.</h5>
            </Col>
          </Row>
          <Row className="ml-5 mr-5 mt-2 mb-5">
            <Col></Col>
            <Col className="text-center">
              <Button outline color="info">
                <a href={SKGaji} download>
                  Surat Keterangan Gaji
                </a>
              </Button>
            </Col>
            <Col className="text-center">
              <Button outline color="info">
                <a href={Asuransi} download>
                  Formulir Asuransi
                </a>
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <Row className="ml-5 mr-5 mt-2 mb-3 text-justify">
            <Col>
              <p>
                <b>
                  Terdapat beberapa ketentuan dan persyaratan yang harus
                  disetujui dan dilengkapi oleh peminjam dana.
                </b>
                <br />
                {peraturan.map((peraturan, key) => (
                  <p key={key} value={peraturan}>
                    {peraturan.konten}
                  </p>
                ))}
              </p>
            </Col>
          </Row>
        </Container>
        <Row className="mt-4 mb-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <CardImg height={300} src={pinjam} />
          </Col>
        </Row>
        <Row className="ml-5 mr-5 mt-2 mb-5 text-justify">
          <Col>
            <FormText color="muted">
              <FontAwesomeIcon icon={faInfoCircle} /> &nbsp;Anda tidak perlu
              daftar kembali apabila telah memiliki akun pada website Primkopal
              AAL Surabaya.
            </FormText>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
