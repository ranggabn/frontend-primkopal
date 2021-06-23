import axios from "axios";
import moment from "moment";
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
import swal from 'sweetalert'

const api = "http://localhost:3001";

export default function ModalSetuju({
  handleClose,
  showModal,
  tampilkeranjang,
  dataKeranjang,
  remove  
}) {
  const { state } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const tamker = tampilkeranjang.map((tamker) => tamker);

  useEffect(() => {
    axios.get(api + "/tampilKeranjangUser/" + state.id).then((res) => {
      setdata(res.data.values);      
    });
  }, []);
  console.log(data);

  function handleSubmit() {    
    data.map((newData) =>
      axios.post(api + "/tambahJual", newData).then((res) => {
        swal({
          title: "Pembelian Sukses!",
          text: "Terima kasih",
          icon: "success",
          button: false,
          timer: 1200,
        });
      })
    );
    handleClose()
    remove(state.id)
  }
  

  return (
    <div>
      <Modal isOpen={showModal}>
        <ModalHeader>PERHATIAN</ModalHeader>
        <ModalBody>
          Apakah anda setuju untuk melanjutkan ke pembelian? Pembelian anda akan
          dibayar melalui bagian keuangan secara langsung.
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
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClose}>
            Kembali
          </Button>{" "}
          <Button color="secondary" onClick={() => handleSubmit()}>
            Setuju
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
