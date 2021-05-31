import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
} from "reactstrap";
import Peraturan from "./peraturan.json";

export default class Pinjam1 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h3 className="text-center">
              <b>FORMULIR PERMOHONAN</b>
              <br />
              <b>USIPA PRIMKOPAL AAL</b>
            </h3>
            <h6 className="text-center">(PEMINJAMAN S.D. RP 25.000.000)</h6>
          </Col>
        </Row>
        <Card className="container mt-5">
          <Row>
            <Col>
              <CardTitle className="text-center mt-5">
                <h5>
                  <b>KETENTUAN</b>
                </h5>
              </CardTitle>
              <CardBody className="text-justify mt-3">
                {Peraturan.map((post) => {
                  return (
                    <div key={post.id}>
                      <p>{post.content}</p>
                    </div>
                  );
                })}
              </CardBody>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                color="primary"
                className="mt-3 mb-4 float-right"
                type="button"
                onClick={this.addMahasiswa}
                href="/pinjam2"
              >
                {" "}
                Setuju{" "}
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}
