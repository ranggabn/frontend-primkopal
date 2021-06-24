import React from "react";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
} from "reactstrap";
import {
  numberWithCommas,
  numberWithCommasString,
} from "../../Fungsional/Koma";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = ({dataKeranjang, tampilkeranjang}) => {
  const tamker = tampilkeranjang.map((tamker) => tamker);
  return (
    <>
      <div className="Post" ref={ref}>

        <ListGroup flush>
          {tamker.map((tamker, key) => (
            <ListGroupItem
              key={key}
              type="button"
              action
            >
              <Row>
                <Col xs="1.5">
                  <Badge color="success" pill>
                    {tamker.jumlah}
                  </Badge>
                </Col>
                <Col>
                  <h5>{tamker.nama}</h5>
                  <p>Rp. {numberWithCommas(tamker.harga)}</p>
                </Col>
                <Col xs="4.5">
                  <strong>
                    {" "}
                    <p>Rp. {numberWithCommasString(tamker.jumlah_harga)}</p>
                  </strong>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
          <br />
        </ListGroup>
        <ListGroup>
          <ListGroupItem color="success">
            <Row>
              <Col xs="4">
                <h5>Total : </h5>
              </Col>
              <Col>
                <h5>
                  {dataKeranjang.total_harga
                    ? "Rp. " + numberWithCommasString(dataKeranjang.total_harga)
                    : ""}
                </h5>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
      <br />
      <Pdf targetRef={ref} filename="struk.pdf">
        {({ toPdf }) => <Button onClick={toPdf}>Cetak Bukti Pembelian</Button>}
      </Pdf>
    </>
  );
};

export default PDF;
