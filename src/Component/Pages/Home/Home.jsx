import React from "react";
import {
  Col,
  Container,
  Row,
  Jumbotron,
  CardDeck,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import logo from "./Images/Logo.png";
import toko from "./Images/toko.png";
import usipa from "./Images/usipa.png";
import jasa from "./Images/jasa.png";
import Kontak from "../../Fungsional/Kontak";

export default function Home() {
  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="auto" className="mb-3">
            <img className="Header-logo" src={logo} alt="Logo" />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>
              <b>PRIMER KOPERASI ANGKATAN LAUT</b>
            </h1>
            <h4 className="text-center">Akademi Angkatan Laut Surabaya</h4>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h5>
              <b>(PRIMKOPAL AAL)</b>
            </h5>
          </Col>
        </Row>

        <Row className="mt-5"></Row>
        <Row className="mt-5"></Row>

        <Jumbotron>
          <h4>
            <b>LAYANAN PRIMKOPAL AAL</b>
          </h4>
          <hr />
          <CardDeck className="mt-4">
            <Card>
              <CardImg variant="top" src={toko} className="mt-4" />
              <CardBody>
                <CardTitle className="text-center">
                  <strong>UNIT TOKO</strong>
                </CardTitle>
                <CardText className="mt-4 text-center">
                  Menyediakan keperluan Kantor, Rapat, Elektronik, dan Kebutuhan
                  Sehari-hari
                </CardText>
              </CardBody>
            </Card>
            <Card>
              <CardImg variant="top" src={usipa} />
              <CardBody>
                <CardTitle className="text-center">
                  <strong>UNIT SIMPAN PINJAM</strong>
                </CardTitle>
                <CardText className="mt-4 text-center">
                  Menyediakan layanan tabungan dan peminjaman kebutuhan anggota
                  Primkopal AAL
                </CardText>
              </CardBody>
            </Card>
            <Card>
              <CardImg variant="top" src={jasa} className="mt-3" />
              <CardBody>
                <CardTitle className="text-center">
                  <strong>UNIT JASA</strong>
                </CardTitle>
                <CardText className="mt-4 text-center">
                  Menyediakan Jasa Laundry, Menyediakan Jasa Pembayaran Listrik,
                  Air, Telepon Pajak (PPOB), Menjadi Rekanan Penyediaan barang
                  dan Kebutuhan kantor
                </CardText>
              </CardBody>
            </Card>
          </CardDeck>
        </Jumbotron>
      </Container>
      <Kontak />
    </div>
  );
}
