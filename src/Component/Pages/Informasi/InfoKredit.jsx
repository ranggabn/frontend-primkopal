import React from "react";
import { Container, Card, CardImg, Row, Col, FormText } from "reactstrap";
import kredit from "./Images/Kredit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function InfoKredit() {
  return (
    <Container className="mt-5">
      <h3 className="text-center">
        <strong>INFORMASI KREDIT BARANG</strong>
      </h3>
      <h5 className="text-center">PRIMKOPAL AAL SURABAYA</h5>
      <Card className="mt-4">
        <Container>
          <Row className="row-text-information mt-5">
            <Col md={10} className="text-information">
              <h4>
                <b>Kredit Barang</b>
              </h4>
            </Col>
          </Row>
          <Row className="row-text-information mt-3">
            <Col md={10} className="text-information">
              <p>
                Kredit Barang pada website Primkopal AAL Surabaya dapat
                dilakukan dengan mengikuti beberapa langkah yang ada pada
                dibawah ini. Pembayaran cicilan kredit barang dilakukan melalui
                pemotongan gaji secara langsung melalui koordinasi antara pihak
                Primkopal AAL Surabaya dan Juru Bayar Gaji.
              </p>
            </Col>
          </Row>
        </Container>
        <Row className="image-information">
          <Col md={6}>
            <CardImg height={300} src={kredit} />
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
