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

          <Jumbotron>
            <h2><b>Informasi</b></h2>
            <hr/>
            <CardDeck className="mt-5">
              <Card>
                <Card.Img
                  variant="top"
                  src="https://placeimg.com/640/480/tech"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://placeimg.com/640/480/tech"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://placeimg.com/640/480/tech"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
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
