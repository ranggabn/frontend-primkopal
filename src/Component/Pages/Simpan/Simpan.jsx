import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

export default class Simpan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      nrp: "",
      satker: "",
      jumlah: "",
      terbilang: "",
      bukti_transfer: "",
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
              <b>FORMULIR SIMPANAN SUKARELA</b>
            </h3>
          </Col>
        </Row>
        <Card className="container mt-5">
          <Row>
            <Col>
              <Form className="mt-4">
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
                <Row>
                  <Col>
                    <Label>Jumlah Simpanan</Label>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Input
                            type="number"
                            name="jumlah"
                            value={this.state.jumlah}
                            onChange={this.handleChange}
                            placeholder="Rp."
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label>Terbilang</Label>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Input
                            type="text"
                            name="terbilang"
                            value={this.state.terbilang}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <p className="text-center">UNTUK SIMPANAN SUKARELA</p>
                <p className="text-center">
                  SILAHKAN TRANSFER KE NOMOR REKENING
                </p>
                <p className="text-center">
                  <b>34343241212341 BANK BTN (A.N PRIMKOPAL AAL SURABAYA)</b>
                </p>
                <hr />
                <FormGroup>
                  <Label for="bukti_transfer">Unggah Bukti Transfer</Label>
                  <Input
                    type="file"
                    name="bukti_transfer"
                    value={this.state.bukti_transfer}
                    onChange={this.handleChange}
                    accept="image/*"
                  />
                </FormGroup>
                <hr />
                <FormGroup>
                  <Row>
                    <Col>
                      <Button
                        color="primary"
                        className="mt-3 float-right"
                        type="button"
                        onClick={this.addMahasiswa}
                        href="/"
                      >
                        {" "}
                        Simpan{" "}
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}
