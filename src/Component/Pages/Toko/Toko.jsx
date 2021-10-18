import React, { useEffect, useState } from "react";
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
  Input
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
import {  
  numberWithCommasString,
} from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function Toko(props) {
  const [produk, setproduk] = useState([]);
  const [data, setdata] = useState({
    id_kategori: "1",
    id_barang: "",
  });
  const [kategori, setkategori] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

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
  }, []);
  const produks = produk.map((produks) => produks);

  function semuaKategori(e) {
    axios.get(api + "/tampilBarang").then((res) => {
      setproduk(res.data.values);
    });
  }

  function handle(id) {
    const newData = { ...data, id_kategori: id };
    setdata(newData);
    axios
      .get(api + "/tampilbarangIdKategori/" + newData.id_kategori)
      .then((res) => {
        setproduk(res.data.values);
      });
  }

  function detailbarang(id) {
    props.history.push("/detailBarang2/" + id);
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

      <Row className="mt-5 ml-1 mr-1">
        <Col md={2} mt="2">
          <hr />
          <h4>
            <strong>Kategori</strong>
          </h4>
          <hr />
          <ListGroup>
            <ListGroupItem
              tag="button"
              action
              onClick={(e) => semuaKategori(e)}
            >
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
          <Input
            type="text"
            className="mb-3"
            placeholder="Cari Nama Barang"
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />
          <Row>
          {produks
            .filter((produks) => {
              if (searchTerm === "") {
                return produks;
              } else if (
                produks.nama.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return produks;
              }
            }).map((produks, key) => (
              <Col md={3} xs={6} className="mb-4" key={key}>
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
                    <CardText>
                      <hr/>
                      <strong>Rp. {numberWithCommasString(produks.harga)}</strong>
                      <p>Stok : {produks.stok}</p>
                    </CardText>
                    <Button
                      color="secondary"
                      className="mt-3"
                      type="button"
                      onClick={() => detailbarang(produks.id_barang)}
                      block
                    >
                      Detail Barang
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
