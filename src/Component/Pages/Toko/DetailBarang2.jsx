import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import AutoFitImage from "react-image-autofit-frame";
import { numberWithCommasString } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function DetailBarang2() {
  let { id } = useParams();
  const [barang, setbarang] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilBarang/" + id).then((res) => {
      setbarang(res.data.values[0]);
    });
  }, []);
  console.log(barang);

  return (
    <div>
      <Container className="mt-5">
        <h2 className="text-center mb-5">
          <strong>DETAIL BARANG</strong>
          <hr />
        </h2>
        <Row>
          <Col>
            <AutoFitImage
              frameWidth="500px"
              frameHeight="400px"
              imgSrc={barang.gambar}
            />
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className="display-5 text-center">{barang.nama}</h1>
                <Row>
                  <Container fluid>
                    <h6 className="lead text-center">
                      <strong>
                        {" "}
                        Rp. {numberWithCommasString(barang.harga)}
                      </strong>
                    </h6>
                  </Container>
                </Row>
                <Row className="mt-2">
                  <Container fluid>
                    <Card body>
                      <CardTitle tag="h5">KETERANGAN : </CardTitle>
                      <CardText>{barang.keterangan}</CardText>
                    </Card>
                  </Container>
                </Row>
                <Row className="mt-4">
                  <Container fluid>
                  </Container>
                </Row>
              </Container>
            </Jumbotron>
            <Row>
              <Col>
                <Button color="secondary" className="float-right" href="/tokopublik">
                  Kembali
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
