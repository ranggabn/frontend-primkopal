import React, { useState, useEffect } from "react";
import { FormControl, ModalTitle } from "react-bootstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import {
  numberWithCommas,
  numberWithCommasString,
} from "../../Fungsional/Koma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";
import qs from "querystring";

const api = "http://localhost:3001";

export default function ModalKeranjang({
  showModal,
  handleClose,
  keterangan,
  toggle,
  jumlah,
  jumlah_harga,
  getListKeranjang,
  produks,
  semuaKategori
}) {
  const [keranjangs, setkeranjangs] = useState([]);
  const [dataKeranjang, setdataKeranjang] = useState({
    id_user: "",
    id_barang: "",
    jumlah_harga: "",
    total_harga: "",
    jumlah: "",
  });
  const [data, setdata] = useState({
    jumlahBarang: jumlah,
    jumlahHarga: jumlah_harga,
  });

  useEffect(() => {
    setdata({
      jumlahBarang: jumlah,
      jumlahHarga: jumlah_harga,
    });
  }, [jumlah, jumlah_harga]);

  const tambah = () => {    
      setdata({
        jumlahBarang: data.jumlahBarang + 1,
        jumlahHarga: keterangan.harga * (data.jumlahBarang + 1),
      });
  };

  const kurang = () => {
    if (data.jumlahBarang !== 1) {
      setdata({
        jumlahBarang: data.jumlahBarang - 1,
        jumlahHarga: keterangan.harga * (data.jumlahBarang - 1),
      });
    }
  };

  function handlesubmit() {
    const dataKer = {
      ...dataKeranjang,
      id_barang: keterangan.id_barang,
      jumlah_harga: data.jumlahHarga,
      jumlah: data.jumlahBarang,
    };
    axios.put(api + "/ubahKeranjang", dataKer).then((res) => {
      swal({
        title: "Sukses Update Keranjang",
        text: "Cek Keranjang Anda!",
        icon: "success",
        button: false,
        timer: 1200,
      });
      const myData = [...keranjangs, res.data.values];
      setkeranjangs(myData);
      getListKeranjang();
      handleClose();
    });
  }

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({ id_barang: id });
    axios
      .delete(api + "/hapusKeranjangId", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        swal({
          title: "Sukses Menghapus Barang",
          text: "Cek Keranjang Anda!",
          icon: "success",
          button: false,
          timer: 1200,
        });
        const newData = keranjangs.filter(
          (keranjangs) => keranjangs.id_barang !== id
        );
        setkeranjangs(newData);
        getListKeranjang()
        handleClose();
      })
      .catch((err) => console.error(err));
  }

  function batal(id) {
    const newData = { ...data, id: id };
    setdata(newData);
    axios.get(api + "/tampilKeranjang/" + newData.id).then((res) => {
      const response = res.data.values[0];
      axios.get(api + "/tampilBarang/" + response.id_barang).then((res) => {
        const barang = res.data.values[0];
        const dataBaru = {
          id_barang: barang.id_barang,
          stok: barang.stok + response.jumlah,
        };
        axios.put(api + "/ubahBarang2", dataBaru);
        semuaKategori()
        remove(response.id_barang); 
      });     
    });
  }

  if (keterangan) {
    return (
      <div>
        <Modal isOpen={showModal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <ModalTitle>
              <strong>{keterangan.nama}</strong>
              <h6>Rp. {numberWithCommas(keterangan.harga)}</h6>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Total Harga : </Label>
                <strong>
                  <p>Rp. {numberWithCommasString(data.jumlahHarga)}</p>
                </strong>
              </FormGroup>
              <FormGroup>
                <Label>Jumlah :</Label>
                <br />
                <Button
                  color="primary"
                  size="sm"
                  className="mr-2"
                  onClick={() => kurang()}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <strong>{data.jumlahBarang}</strong>
                <Button
                  color="primary"
                  size="sm"
                  className="ml-2"
                  onClick={() => tambah()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </FormGroup>
              <FormGroup>
                <Label>Keterangan : </Label>
                <FormControl
                  as="textarea"
                  rows="3"
                  name="keterangan"
                  defaultValue={keterangan.keterangan}
                  disabled
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              toggle={toggle}
              onClick={() => batal(keterangan.id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
            </Button>{" "}
            <Button
              color="primary"
              toggle={toggle}
              onClick={() => handlesubmit()}
            >
              Simpan
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Modal isOpen={showModal}>
          <ModalHeader>Kosong</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={() => handlesubmit()}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
