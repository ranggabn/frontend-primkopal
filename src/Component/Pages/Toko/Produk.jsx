import React, { useEffect, useState, useContext } from "react";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Badge
} from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCameraRetro,
  faPencilAlt,
  faBriefcase,
  faCar,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { numberWithCommas } from "../../Fungsional/Koma";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function Produk() {
  const { state } = useContext(AuthContext);
  const [produk, setproduk] = useState([]);
  const [data, setdata] = useState({
    id_kategori: "1",
    id_barang: "",
  });
  const [kategori, setkategori] = useState([]);
  const [keranjangs, setkeranjangs] = useState([]);
  const [dataKeranjang, setdataKeranjang] = useState({
    id_user: "",
    id_barang: "",
    jumlah_harga: "",
    total_harga: "",
    jumlah: ""
  });
  const [tampilkeranjang, settampilkeranjang] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilKategori").then((res) => {
      setkategori(res.data.values);
    });
  }, []);
  const kb = kategori.map((kb) => kb);

  const Icon = ({ nama }) => {
    if (nama === "Bahan Pokok")
      return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
    if (nama === "Alat Tulis")
      return <FontAwesomeIcon icon={faPencilAlt} className="mr-3" />;
    if (nama === "Alat Kantor")
      return <FontAwesomeIcon icon={faBriefcase} className="mr-3" />;
    if (nama === "Elektronik")
      return <FontAwesomeIcon icon={faCameraRetro} className="mr-3" />;
    if (nama === "Kendaraan")
      return <FontAwesomeIcon icon={faCar} className="mr-3" />;
    if (nama === "Merchandise")
      return <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />;

    return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
  };

  useEffect(() => {
    axios.get(api + "/tampilBarang").then((res) => {
      setproduk(res.data.values);
    });
    getListKeranjang();
  }, []);

  function semuaKategori(e) {
    axios.get(api + "/tampilBarang").then((res) => {
      setproduk(res.data.values);
    });
    getListKeranjang();
  }

  function handle(id) {
    const newData = { ...data, id_kategori: id };
    setdata(newData);
    axios
      .get(api + "/tampilbarangIdKategori/" + newData.id_kategori)
      .then((res) => {
        setproduk(res.data.values);
      });
    getListKeranjang();
  }
  const produks = produk.map((produks) => produks);

  async function keranjang(id) {
    const newData = { ...data, id_barang: id };
    setdata(newData);
    let response = await axios.get(api + "/tampilBarang/" + newData.id_barang);
    response = response.data.values[0];
    const dataKer = {
      ...dataKeranjang,
      id_barang: response.id_barang,
      id_user: state.id,
      jumlah_harga: response.harga,
      jumlah: 1
    };
    setdataKeranjang(dataKer);
    axios.post(api + "/tambahKeranjang", dataKer).then((res) => {
      const myData = [...keranjangs, res.data.values];
      setkeranjangs(myData);
      getListKeranjang();
    });
  }

  const getListKeranjang = () => {
    axios.get(api + "/tampilKeranjang/" + state.id).then((res) => {
      settampilkeranjang(res.data.values);
      console.log(res.data.values);
    });
  };
  const tamker = tampilkeranjang.map((tamker) => tamker);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col>
            <h3 className="text-center">
              <b>UNIT USAHA</b>
              <br />
              <b>PRIMKOPAL AAL</b>
            </h3>
          </Col>
        </Row>
      </Container>

      <Row className="mt-5 ml-3 mr-3">
        <Col md={2} mt="2">
          <hr />
          <h4>
            <strong>Kategori</strong>
          </h4>
          <hr />
          <ListGroup>
            <ListGroupItem tag="button" action onClick={(e) => semuaKategori(e)}>
              Semua Kategori
            </ListGroupItem>
            {kb.map((kb, key) => (
              <ListGroupItem
                tag="button"
                action
                key={key}
                onClick={() => handle(kb.id)}
              >
                <Icon nama={kb.kategori_barang} />
                {kb.kategori_barang}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <hr />
          <h4>
            <strong>Daftar Produk</strong>
          </h4>
          <hr />
          <Row>
            {produks.map((produks, key) => (
              <Col md={4} xs={6} className="mb-4" key={key}>
                <Card className="shadow">
                  <CardImg
                    top
                    width="100%"
                    height="200vw"
                    src={produks.gambar}
                    alt="gambar"
                  />
                  <CardBody>
                    <CardTitle tag="h5">{produks.nama}</CardTitle>
                    <CardText>Rp. {numberWithCommas(produks.harga)}</CardText>
                    <CardText>{produks.kategori_barang}</CardText>
                    <Button
                      color="secondary"
                      className="mt-3 mb-4"
                      type="button"
                      onClick={() => keranjang(produks.id_barang)}
                      block
                    >
                      {" "}
                      Tambah Keranjang{" "}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={3} mt="2">
          <hr />
          <h4>
            <strong>Hasil</strong>
          </h4>
          <hr />
          <ListGroup flush>
            {tamker.map((tamker, key) => (
              <ListGroupItem key={key}>
                <Row>
                  <Col xs="2">
                    <Badge color="success" pill>
                      {tamker.jumlah}
                    </Badge>
                  </Col>
                  <Col xs="auto">
                    <h5>{tamker.nama}</h5>
                    <p>Rp. {numberWithCommas(tamker.harga)}</p>
                  </Col>
                  <Col xs="3"></Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
