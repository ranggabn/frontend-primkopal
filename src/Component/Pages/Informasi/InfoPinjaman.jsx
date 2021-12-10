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
          <Row className="mt-5 row-text-information">
            <Col md={10} className="text-information">
              <h4>
                <b>Pinjaman Dana</b>
              </h4>
            </Col>
          </Row>
          <Row className="row-text-information mt-3">
            <Col md={10} className="text-information">
              <p>
                Pinjaman Dana pada website Primkopal AAL Surabaya dapat
                dilakukan dengan mengikuti beberapa langkah yang ada pada
                dibawah ini. Pembayaran cicilan pinjaman dana dilakukan melalui
                pemotongan gaji secara langsung melalui koordinasi antara pihak
                Primkopal AAL Surabaya dan Juru Bayar Gaji.
              </p>
            </Col>
          </Row>
          <Row className="row-text-information mt-3">
            <Col md={10} className="text-center">
              <h5>Unggah Dokumen Persyaratan Dibawah Ini.</h5>
            </Col>
          </Row>
          <Row className="row-text-information mt-3 mb-4">
            <Col md={3}></Col>
            <Col md={3} className="text-center pt-1">
              <Button outline color="info">
                <a href={SKGaji} download>
                  Surat Keterangan Gaji
                </a>
              </Button>
            </Col>
            <Col md={3} className="text-center pt-1">
              <Button outline color="info">
                <a href={Asuransi} download>
                  Formulir Asuransi
                </a>
              </Button>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row className="row-text-information mt-3">
            <Col md={10} className="text-information">
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
        <Row className="image-information">
          <Col md={6}>
            <CardImg height={300} src={pinjam} />
          </Col>
        </Row>
        <Container>
          <Row className="row-text-information mt-3 mb-5">
            <Col md={10} className="text-information">
              <FormText color="muted">
                <FontAwesomeIcon icon={faInfoCircle} /> &nbsp;Anda tidak perlu
                daftar kembali apabila telah memiliki akun pada website
                Primkopal AAL Surabaya.
              </FormText>
            </Col>
          </Row>
        </Container>
      </Card>
    </Container>
  );
}
