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
          <Row className="mt-5 ml-5">
            <Col>
              <h4>
                <b>Kredit Barang</b>
              </h4>
            </Col>
          </Row>
          <Row className="ml-5 mr-5 mt-2 mb-3 text-justify">
            <Col>
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
        <Row className="mt-4 mb-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <CardImg height={300} src={kredit} />
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
