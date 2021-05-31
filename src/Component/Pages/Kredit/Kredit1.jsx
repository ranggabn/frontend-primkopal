import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
} from "reactstrap";

export default class Kredit1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nrp: "",
      nama: "",
      satker: "",
      nohp: "",
      nama_barang: "",
      harga_barang: "",
      terbilang: "",
      response: "",
      display: "none",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h3 className="text-center">
              <b>FORMULIR PERMOHONAN</b>
              <br />
              <b>KREDIT PRIMKOPAL AAL</b>
            </h3>
            <h6 className="text-center">(SEPEDA / BARANG / ELEKTRONIK)</h6>
          </Col>
        </Row>
        <Card className="mt-5">
          <Form className="form mt-4 mb-4">
            <Col>
              <Label>Nama Lengkap</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="nama"
                      value={this.state.nama}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>NRP / NIP</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="nrp"
                      value={this.state.nrp}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>Satuan Kerja</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="satker"
                      value={this.state.satker}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>No. HP / Telefon</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="number"
                      name="nohp"
                      value={this.state.nohp}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Label>Nama Barang</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="textarea"
                      name="nama_barang"
                      value={this.state.nama_barang}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col>
                  <Label>Harga Barang</Label>
                  <FormGroup>
                    <Input
                      type="number"
                      name="harga_barang"
                      value={this.state.harga_barang}
                      onChange={this.handleChange}
                      placeholder="Rp."
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <Label>Terbilang</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      name="terbilang"
                      value={this.state.terbilang}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Row>
                  <Col>
                    <Button
                      color="primary"
                      className="mt-3 float-right"
                      type="button"
                      onClick={this.addMahasiswa}
                      href="/kredit2"
                    >
                      {" "}
                      Lanjut{" "}
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Form>
        </Card>
      </Container>
    );
  }
}
