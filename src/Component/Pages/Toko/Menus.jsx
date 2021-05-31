import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { numberWithCommas } from "../../Fungsional/Koma";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <CardImg
          top
          width="100%"
          height="200vw"
          src={
            "assets/images/" +
            menu.categories.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{menu.nama}</CardTitle>
          <CardText>Rp. {numberWithCommas(menu.harga)}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Menus;
