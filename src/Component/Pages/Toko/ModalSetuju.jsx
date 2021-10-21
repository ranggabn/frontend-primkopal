import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  numberWithCommas,
  numberWithCommasString,
} from "../../Fungsional/Koma";
import { AuthContext } from "../../../App";
import swal from "sweetalert";
import Pdf from "react-to-pdf";
import { Redirect } from "react-router";

const api = "http://localhost:3001";
const ref = React.createRef();

export default function ModalSetuju({
  handleClose,
  showModal,
  tampilkeranjang,
  dataKeranjang,
  remove,
}) {
  const { state } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const tamker = tampilkeranjang.map((tamker) => tamker);

  useEffect(() => {
    axios.get(api + "/tampilKeranjangUser/" + state.id).then((res) => {
      setdata(res.data.values);
    });
  }, []);

  const arr = [];
  tampilkeranjang.map((lb) =>
    arr.push({
      id_barang: lb.id_barang,
      stok: lb.stok - lb.jumlah
    })
  );
  function handleSubmit(e) {
    e.preventDefault();
    tampilkeranjang.map(
      (newData) => axios.post(api + "/tambahPengambilan", newData).then((res) => {}),
      swal({
        title: "Pembelian Sukses!",
        text: "Lihat Bukti Pembelian Anda",
        icon: "success",
        button: false,
        timer: 1200,
      })
    );
    arr.map(arr => axios.put(api + "/ubahBarang2", arr))
    handleClose();
    remove(state.id);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <div>
      <Modal isOpen={showModal}>
        <ModalHeader>PERHATIAN</ModalHeader>
        <ModalBody>
          <p>1. Pembelian anda akan dibayar melalui juru bayar</p>
          <p>
            2. Ketika anda menekan tombol setuju, bukti pembelian akan otomatis
            diunduh ke perangkat anda
          </p>
          <p>3. Bukti pembelian digunakan untuk melakukan pengambilan gambar</p>
          <div className="Post" ref={ref}>
            <br />
            <hr />
            <h5>BUKTI PEMBELIAN - [{state.id}]</h5>
            <hr />
            <ListGroup flush>
              {tamker.map((tamker, key) => (
                <ListGroupItem key={key} type="button" action>
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
                        ? "Rp. " +
                          numberWithCommasString(dataKeranjang.total_harga)
                        : ""}
                    </h5>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </div>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            Kembali
          </Button>{" "}
          <Pdf targetRef={ref} filename="struk.pdf">
            {({ toPdf }) => (
              <Button color="primary" onClick={(e) => handleSubmit(e)} onClickCapture={toPdf}>
                Setuju
              </Button>
            )}
          </Pdf>
        </ModalFooter>
      </Modal>
    </div>
  );
}
