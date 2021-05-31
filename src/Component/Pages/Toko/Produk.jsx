import React, { Component } from "react";
import Kategori from "./Kategori";
import { Row, Col, Container } from "reactstrap";
import Hasil from "./Hasil";
import Menus from "./Menus";
import axios from "axios";

const api = "http://localhost:3004";

export default class Toko extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(api + "/products?categories.nama=" + this.state.kategoriYangDipilih)
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      kategoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(api + "/products?categories.nama=" + value)
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .post(api + "/keranjangs")
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.menus);
    const { menus } = this.state;
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
          <Kategori
            changeCategory={this.changeCategory}
            kategoriYangDipilih={this.kategoriYangDipilih}
          />
          <Col>
            <hr />
            <h4>
              <strong>Daftar Produk</strong>
            </h4>
            <hr />
            <Row>
              {menus &&
                menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
            </Row>
          </Col>
          <Hasil />
        </Row>
      </div>
    );
  }
}
