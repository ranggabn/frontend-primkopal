import React, { useEffect, useState } from "react";
// import Kategori from "./Kategori";
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
  Button
} from "reactstrap";
import Hasil from "./Hasil";
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

const api = "http://localhost:3001";

export default function Produk(props) {
  const [produk, setproduk] = useState([]);
  const [data, setdata] = useState({
    id_kategori : '1'
  });
  const [kategori, setkategori] = useState([]);

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
      console.log(res.data.values);
    });
  }, [])

  function handle(id) {
    const newData = { ...data, id_kategori : id};
    setdata(newData)
    axios.get(api + "/tampilbarangIdKategori/" + newData.id_kategori).then((res) => {
      setproduk(res.data.values);
      console.log(res.data.values);
    });
    console.log(newData);
  }
  const produks = produk.map((produks) => produks);

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
            {kb.map((kb, key) => (
              <ListGroupItem tag="button" action key={key} onClick={() => handle(kb.id)}>
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
        <Hasil />
      </Row>
    </div>
  );
}

// export default class Toko extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       menus: [],
//       kategoriYangDipilih: "Makanan",
//       keranjangs: [],
//     };
//   }

//   componentDidMount() {
//     axios
//       .get(api + "/products?categories.nama=" + this.state.kategoriYangDipilih)
//       .then((res) => {
//         console.log("Response : ", res);
//         const menus = res.data;
//         this.setState({ menus });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   changeCategory = (value) => {
//     this.setState({
//       kategoriYangDipilih: value,
//       menus: [],
//     });

//     axios
//       .get(api + "/products?categories.nama=" + value)
//       .then((res) => {
//         console.log("Response : ", res);
//         const menus = res.data;
//         this.setState({ menus });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   masukKeranjang = (value) => {
//     axios
//       .post(api + "/keranjangs")
//       .then((res) => {
//         console.log("Response : ", res);
//         const menus = res.data;
//         this.setState({ menus });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   render() {
//     // console.log(this.state.menus);
//     const { menus } = this.state;
//     return (

//     );
//   }
// }
