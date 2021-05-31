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

export default class Daftar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      nrp: "",
      satker: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      nohp: "",
      password: "",
      password_ulang: "",
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
              <b>DAFTAR ANGGOTA</b>
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
                    <Label>Tempat Lahir</Label>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Input
                            type="text"
                            name="tempat_lahir"
                            value={this.state.tempat_lahir}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label>Tanggal Lahir</Label>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Input
                            type="date"
                            name="tanggal_lahir"
                            value={this.state.tanggal_lahir}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
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
                <Label>Kata Sandi</Label>
                <FormGroup>
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Label>Ulangi Kata Sandi</Label>
                <FormGroup>
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        name="password_ulang"
                        value={this.state.password_ulang}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <hr />
                <p className="text-center">UNTUK PENDAFTARAN ANGGOTA</p>
                <p className="text-center">
                  SILAHKAN MEMBAYAR IURAN WAJIB SEJUMLAH RP 10.000
                </p>
                <p className="text-center">
                  PEMBAYARAN BISA DILAKUKAN DENGAN TRANSFER KE NOMOR REKENING
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
                        Daftar{" "}
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
