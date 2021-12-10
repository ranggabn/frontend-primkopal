import React from "react";
import { Container, Card, CardImg, Row, Col, FormText } from "reactstrap";
import pembelian from "./Images/Pembelian.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function InfoPembelian() {
  return (
    <Container className="mt-5">
      <h3 className="text-center">
        <strong>INFORMASI PEMBELIAN BARANG</strong>
      </h3>
      <h5 className="text-center">PRIMKOPAL AAL SURABAYA</h5>
      <Card className="mt-4 col-md-12">
        <Container>
          <Row className="mt-5 row-text-information">
            <Col md={10} className="text-information">
              <h4>
                <b>Pembelian Barang</b>
              </h4>
            </Col>
          </Row>
          <Row className="row-text-information mt-3">
            <Col md={10} className="text-information">
              <p>
                Pembelian Barang pada website Primkopal AAL Surabaya dapat
                dilakukan dengan mengikuti beberapa langkah yang ada pada
                dibawah ini. Pihak Primkopal AAL telah bekerja sama dengan Juru
                Bayar Gaji sehingga pembelian barang pada website ini dibayarkan
                melalui pemotongan gaji secara langsung.
              </p>
            </Col>
          </Row>
        </Container>
        <Row className="image-information">
          <Col md={6}>
            <CardImg height={200} src={pembelian} />
          </Col>
        </Row>
        <Container>
          <Row className="row-text-information mb-5">
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
