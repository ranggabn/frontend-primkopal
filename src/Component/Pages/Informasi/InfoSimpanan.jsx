import React from "react";
import { Container, Card, CardImg, Row, Col, FormText } from "reactstrap";
import simpanan from "./Images/Simpanan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function InfoSimpanan() {
  return (
    <Container className="mt-5">
      <h3 className="text-center">
        <strong>INFORMASI SIMPANAN SUKARELA</strong>
      </h3>
      <h5 className="text-center">PRIMKOPAL AAL SURABAYA</h5>
      <Card className="mt-4">
        <Container>
          <Row className="row-text-information mt-5">
            <Col md={10} className="text-information">
              <h4>
                <b>Simpanan Sukarela</b>
              </h4>
            </Col>
          </Row>
          <Row className="row-text-information mt-3">
            <Col md={10} className="text-information">
              <p>
                Simpanan Sukarela pada website Primkopal AAL Surabaya dapat
                dilakukan dengan mengikuti beberapa langkah yang ada pada
                dibawah ini. Segala proses simpanan sukarela dapat dilihat
                langsung pada halaman informasi tabungan. Proses simpanan dan
                pencairan dapat dilakukan tanpa biaya administrasi dengan
                menunjukkan bukti cetak tabungan. Proses tabungan sukarela dapat
                dilakukan dengan melakukan transfer atau dibayarkan langsung ke
                pihak Primkopal AAL Surabaya.
              </p>
            </Col>
          </Row>
        </Container>
        <Row className="image-information">
          <Col md={6}>
            <CardImg height={200} src={simpanan} />
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
