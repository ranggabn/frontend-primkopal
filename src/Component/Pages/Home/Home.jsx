import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Jumbotron,
  CardDeck,
  Card,
} from "react-bootstrap";
import logo from "./Images/Logo.png";
import toko from "./Images/toko.png";
import usipa from "./Images/usipa.png";
import jasa from "./Images/jasa.png";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
                <b>PRIMKOPAL AAL</b>
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h5>
                Koperasi Primer Akademi Angkatan Laut yang berada dibawah Induk
                Koperasi TNI AL
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
                <Card.Img
                  variant="top"
                  src={toko}
                  className="mt-4"
                />
                <Card.Body>
                  <Card.Title className="text-center">UNIT TOKO</Card.Title>
                  <Card.Text className="mt-4 text-center">
                    Menyediakan keperluan Kantor, Rapat, Elektronik, dan
                    Kebutuhan Sehari-hari
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src={usipa}
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    UNIT SIMPAN PINJAM
                  </Card.Title>
                  <Card.Text className="mt-4 text-center">
                    Menyediakan layanan tabungan dan peminjaman kebutuhan
                    anggota Primkopal AAL
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src={jasa}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title className="text-center">UNIT JASA</Card.Title>
                  <Card.Text className="mt-4 text-center">
                    Menyediakan Jasa Laundry, Menyediakan Jasa Pembayaran
                    Listrik, Air, Telepon Pajak (PPOB), Menjadi Rekanan
                    Penyediaan barang dan Kebutuhan kantor
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
