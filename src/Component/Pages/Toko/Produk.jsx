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
  Badge,
  FormText,
  Input,
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
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  numberWithCommas,
  numberWithCommasString,
} from "../../Fungsional/Koma";
import { Redirect } from "react-router";
import { AuthContext } from "../../../App";
import swal from "sweetalert";
import ModalKeranjang from "./ModalKeranjang";
import qs from "querystring";
import ModalSetuju from "./ModalSetuju";
import moment from "moment";

const api = "http://localhost:3001";

export default function Produk(props) {
  const { state } = useContext(AuthContext);
  const [produk, setproduk] = useState([]);
  const [data, setdata] = useState({
    id_kategori: "1",
    id_barang: "",
  });
  const [disable, setdisable] = useState({
    isDisabled: true,
    noDisabled: false,
  });
  const [kategori, setkategori] = useState([]);
  const [keranjangs, setkeranjangs] = useState([]);
  const [dataKeranjang, setdataKeranjang] = useState({
    id_user: "",
    id_barang: "",
    jumlah_harga: "",
    total_harga: "",
    jumlah: "",
    tanggal_penjualan: "",
    status: false,
  });
  const [tampilkeranjang, settampilkeranjang] = useState([]);
  const [modal, setmodal] = useState({
    showModal: false,
    jumlah: 0,
    keterangan: "",
    jumlah_harga: 0,
  });
  const toggle = () => setmodal(!modal);
  const [setuju, setsetuju] = useState({
    showModal: false,
  });
  const [searchTerm, setsearchTerm] = useState("");

  const handleShow = (id) => {
    axios.get(api + "/tampilKeranjangBarang/" + id).then((res) => {
      setmodal({
        showModal: true,
        keterangan: res.data.values[0],
        jumlah: res.data.values[0].jumlah,
        jumlah_harga: res.data.values[0].jumlah_harga,
      });
    });
  };

  const showSetuju = () => {
    setsetuju({
      showModal: true,
    });
  };

  const handleClose = () => {
    setmodal({
      showModal: false,
    });
    setsetuju({
      showModal: false,
    });
  };

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

  const kb = kategori.map((kb) => kb);
  useEffect(() => {
    axios.get(api + "/tampilKategori").then((res) => {
      setkategori(res.data.values);
    });
    axios.get(api + "/tampilBarang").then((res) => {
      setproduk(res.data.values);
    });
    setdataKeranjang({
      tanggal_penjualan: moment().format("YYYY-MM-DD"),
    });
    getListKeranjang();
  }, []);

  function semuaKategori() {
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
    getListKeranjang();
  }
  const produks = produk.map((produks) => produks);

  function keranjang(id) {
    const newData = { ...data, id_barang: id };
    setdata(newData);
    axios.get(api + "/tampilBarang/" + newData.id_barang).then((res) => {
      const response = res.data.values[0];
      console.log(response);
      axios
        .get(api + "/tampilKeranjangBarang/" + newData.id_barang)
        .then((res) => {            
            if (res.data.values.length === 0) {
              const dataKer = {
                ...dataKeranjang,
                id_barang: response.id_barang,
                id_user: state.id,
                jumlah_harga: response.harga,
                total_harga: 0,
                jumlah: 1,
                tanggal_penjualan: moment().format("YYYY-MM-DD"),
                status: false,
              };
              setdataKeranjang(dataKer);
              axios.post(api + "/tambahKeranjang", dataKer).then((res) => {
                swal({
                  title: "Sukses Masuk Keranjang",
                  text: "Cek Keranjang Anda!",
                  icon: "success",
                  button: false,
                  timer: 1200,
                });
                const myData = [...keranjangs, res.data.values];
                setkeranjangs(myData);
                getListKeranjang();
              });
            } else if (res.data.values[0].jumlah !== response.stok) {
              const dataKer = {
                ...dataKeranjang,
                id_barang: response.id_barang,
                jumlah_harga: res.data.values[0].jumlah_harga + response.harga,
                jumlah: res.data.values[0].jumlah + 1,
              };
              axios.put(api + "/ubahKeranjang", dataKer).then((res) => {
                swal({
                  title: "Sukses Masuk Keranjang",
                  text: "Cek Keranjang Anda!",
                  icon: "success",
                  button: false,
                  timer: 1200,
                });
                const myData = [...keranjangs, res.data.values];
                setkeranjangs(myData);
                getListKeranjang();
              });
            } else {
              swal({
                title: "Gagal Masuk Keranjang",
                text: "Barang Yang Dibeli Tidak Dapat Melebihi Stok Tersedia!",
                icon: "error",
                button: false,
                timer: 1500,
              });
            }
          semuaKategori();
        });
    });
  }

  const getListKeranjang = () => {
    axios.get(api + "/tampilKeranjang/" + state.id).then((res) => {
      settampilkeranjang(res.data.values);
    });
    axios.get(api + "/totalHarga/" + state.id).then((res) => {
      const dataKer = {
        ...dataKeranjang,
        total_harga: res.data.values[0].total_harga,
      };
      setdataKeranjang(dataKer);
    });
  };
  const tamker = tampilkeranjang.map((tamker) => tamker);

  function detailbarang(id) {
    props.history.push("/detailBarang/" + id);
  }

  function remove(id) {
    const data = qs.stringify({ id_user: id });
    axios
      .delete(api + "/hapusKeranjangIdUser", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        const newData = keranjangs.filter(
          (keranjangs) => keranjangs.id_user !== id
        );
        setkeranjangs(newData);
        getListKeranjang();
        semuaKategori();
      })
      .catch((err) => console.error(err));
  }

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
              })
              .map((produks, key) => (
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
                      <CardText>
                        <strong>Rp. {numberWithCommas(produks.harga)}</strong>
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
                      <Button
                        color="info"
                        className="mb-1"
                        type="button"
                        onClick={() => keranjang(produks.id_barang)}
                        block
                        disabled={
                          produks.stok ? disable.noDisabled : disable.isDisabled
                        }
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
            <strong>Keranjang</strong>
          </h4>
          <hr />
          <ListGroup flush>
            {tamker.map((tamker, key) => (
              <ListGroupItem
                key={key}
                type="button"
                onClick={() => handleShow(tamker.id_barang)}
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
            <ModalKeranjang
              handleClose={handleClose}
              {...modal}
              toggle={toggle}
              getListKeranjang={getListKeranjang}
              semuaKategori={semuaKategori}
            />
            <FormText color="muted">
              <FontAwesomeIcon icon={faInfoCircle} /> &nbsp;Tekan list barang
              untuk mengedit keranjang
            </FormText>
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
          <Row className="mt-3">
            <Container>
              <Button
                color="success"
                onClick={() => showSetuju(state.id)}
                block
              >
                <ModalSetuju
                  handleClose={handleClose}
                  {...setuju}
                  getListKeranjang={getListKeranjang}
                  tampilkeranjang={tampilkeranjang}
                  dataKeranjang={dataKeranjang}
                  remove={remove}
                />
                Lanjutkan Pembayaran
              </Button>
            </Container>
          </Row>
          <Row className="mt-3">
            <Container>
              <Button color="danger" onClick={() => remove(state.id)} block>
                Bersihkan Keranjang
              </Button>
            </Container>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
