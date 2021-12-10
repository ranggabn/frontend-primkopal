import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Jumbotron, Container, Col, Row, CardImg } from "reactstrap";
import { AuthContext } from "../../../App";
import user from "./Images/user.png";
import moment from "moment";

export default function RoleKaprim() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <Col md={3} className="col-logo-home-img mt-1">
              <CardImg src={user} className="img-home-after-login" />
            </Col>
            <Col md={9} className="mt-1">
              <h1>Selamat Datang, </h1>
              <h4>Ketua Primkopal AAL Surabaya</h4>
              <p className="lead">
                <Row className="">
                  <Col md={3} sm={4} xs={5}>
                    Nama
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    :
                  </Col>
                  <Col md={7} sm={6} xs={5}>
                    {state.user}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={4} xs={5}>
                    NIP / NRP
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    :
                  </Col>
                  <Col md={7} sm={6} xs={5}>
                    {state.id}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={4} xs={5}>
                    Satuan Kerja
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    :
                  </Col>
                  <Col md={7} sm={6} xs={5}>
                    {state.satker}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={4} xs={5}>
                    Tempat Lahir
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    :
                  </Col>
                  <Col md={7} sm={6} xs={5}>
                    {state.tempat_lahir}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={4} xs={5}>
                    Tanggal Lahir
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    :
                  </Col>
                  <Col md={7} sm={6} xs={5}>
                    {moment(state.tanggal_lahir).format("DD-MM-YYYY")}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={4} xs={5}>
                    Nomor Telefon
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    :
                  </Col>
                  <Col md={7} sm={6} xs={5}>
                    {state.nomor_telefon}
                  </Col>
                </Row>
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}
