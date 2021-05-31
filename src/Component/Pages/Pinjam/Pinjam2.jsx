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
      nohp: "",
      besar_pinjaman: "",
      terbilang: "",
      keperluan: "",
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
              <b>FORMULIR PERMOHONAN</b>
              <br />
              <b>USIPA PRIMKOPAL AAL</b>
            </h3>
            <h6 className="text-center">(PEMINJAMAN S.D. RP 25.000.000)</h6>
          </Col>
        </Row>
        <Card className="container mt-5">
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
              <Row>
                <Col>
                  <Label>Besar Pinjaman</Label>
                  <FormGroup>
                    <Input
                      type="number"
                      name="besar_pinjaman"
                      value={this.state.besar_pinjaman}
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
              <Label>Keperluan</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="textarea"
                      name="keperluan"
                      value={this.state.keperluan}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Button
                            className="fa fa-chevron-left mt-3"
                            type="button"
                            onClick={this.addMahasiswa}
                            href="/pinjam"
                          >
                            {" "}
                            Kembali{" "}
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button
                      color="primary"
                      className="mt-3 float-right"
                      type="button"
                      onClick={this.addMahasiswa}
                      href="/pinjam3"
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
