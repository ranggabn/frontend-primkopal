import React, {useState, useEffect} from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import axios from "axios";
import { numberWithCommas } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function Menus(props) {
  const [barang, setbarang] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilBarang").then((res) => {
      setbarang(res.data.values);
    });
  }, []);

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <CardImg
          top
          width="100%"
          height="200vw"
          src={barang.gambar}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{barang.nama}</CardTitle>
          <CardText>Rp. {numberWithCommas(barang.harga)}</CardText>
        </CardBody>
      </Card>
    </Col>
  )
}