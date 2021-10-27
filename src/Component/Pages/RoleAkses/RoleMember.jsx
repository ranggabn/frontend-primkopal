import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Jumbotron, Container, Col, Row, CardImg } from "reactstrap";
import { AuthContext } from "../../../App";
import Kontak from "../../Fungsional/Kontak";
import user from "./Images/user.png";
import moment from "moment";

export default function RoleMember() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <Col className="col-md-3 col-sm-6">
              <CardImg src={user}/>
            </Col>
            <Col>
              <h1>Selamat Datang, </h1>
              <h4>Anggota Primkopal AAL Surabaya</h4>
              <p className="lead">
                <Row>
                  <Col>Nama &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;&nbsp;&nbsp;: </Col>
                  <Col>{state.user}</Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col> NIP / NRP &ensp;&ensp;&ensp;&nbsp;&nbsp;: </Col>
                  <Col>{state.id}</Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>                  
                </Row>
                <Row>
                  <Col>Satuan Kerja &ensp; &nbsp;:</Col>
                  <Col>{state.satker}</Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>Tempat Lahir &ensp;&ensp;:</Col>
                  <Col>{state.tempat_lahir}</Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>Tanggal Lahir &ensp; :</Col>
                  <Col>{moment(state.tanggal_lahir).format("DD-MM-YYYY")}</Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>Nomor Telefon :</Col>
                  <Col>{state.nomor_telefon}</Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </p>
            </Col>
          </Row>
          <hr className="my-2" />
          <Row>
            <Col className="text-right">Hormat Kami, </Col>
          </Row>
          <Row>
            <Col className="text-right">
              Pengurus Primer Koperasi Angkatan Laut
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Kontak />
    </div>
  );
}
