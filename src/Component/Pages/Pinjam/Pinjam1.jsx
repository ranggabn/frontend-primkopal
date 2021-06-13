import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function Pinjam1() {
  const { state } = useContext(AuthContext);
  const [peraturan, setperaturan] = useState([])

  useEffect(() => {
    axios.get(api + "/tampilPeraturan").then((res) => {
      setperaturan(res.data.values);
    });
  }, []);
  
  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
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
          {peraturan.map((peraturan, key) => (
            <p key={key} value={peraturan}>
              {peraturan.konten}
            </p>
            ))}
          </CardBody>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            color="primary"
            className="mt-3 mb-4 float-right"
            type="button"
            href="/pinjam2"
          >
            {" "}
            Setuju{" "}
          </Button>
        </Col>
      </Row>
    </Card>
  </Container>
  )
}