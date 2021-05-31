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
      cicilan: "",
      totalcicilan: "",
      kta: "",
      ktppemohon: "",
      ktppasangan: "",
      slipgaji: "",
      rinciangaji: "",
      kk: "",
      spk: "",
      asuransi: "",
      bebashutang : "",
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
              <FormGroup>
                <Label for="exampleSelect">Lama Cicilan</Label>
                <Input
                  type="select"
                  name="cicilan"
                  onChange={this.handleChange}
                >
                  <option value={this.state.cicilan} disabled selected>
                    Pilih Cicilan
                  </option>
                  <option value={this.state.cicilan}>3 Bulan</option>
                  <option value={this.state.cicilan}>6 Bulan</option>
                  <option value={this.state.cicilan}>12 Bulan</option>
                </Input>
              </FormGroup>
              <Label>Jumlah Cicilan / Bulan</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="totalcicilan"
                      value={this.state.totalcicilan}
                      onChange={this.handleChange}
                      disabled
                    />
                  </Col>
                </Row>
              </FormGroup>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="kta">KTA</Label>
                    <Input
                      type="file"
                      name="kta"
                      value={this.state.kta}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="ktppemohon">KTP Pemohon</Label>
                    <Input
                      type="file"
                      name="ktppemohon"
                      value={this.state.ktppemohon}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="ktppasangan">KTP Suami / Istri</Label>
                    <Input
                      type="file"
                      name="ktppasangan"
                      value={this.state.ktppasangan}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="slipgaji">Slip Gaji</Label>
                    <Input
                      type="file"
                      name="slipgaji"
                      value={this.state.slipgaji}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="rinciangaji">Rincian Gaji Juru Bayar</Label>
                    <Input
                      type="file"
                      name="rinciangaji"
                      value={this.state.rinciangaji}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="kk">KK Non Dinas</Label>
                    <Input
                      type="file"
                      name="kk"
                      value={this.state.kk}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="spk">Surat Pernyataan Kesehatan</Label>
                    <Input
                      type="file"
                      name="spk"
                      value={this.state.spk}
                      onChange={this.handleChange}
                      accept="image/*"spk
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="asuransi">Formulir Surat Permintaan Asuransi Jiwa BP Asri</Label>
                    <Input
                      type="file"
                      name="asuransi"
                      value={this.state.asuransi}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="bebashutang">Surat Pernyataan Bebas Hutang Bank</Label>
                    <Input
                      type="file"
                      name="bebashutang"
                      value={this.state.bebashutang}
                      onChange={this.handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Button
                          className="fa fa-chevron-left mt-3"
                          type="button"
                          href="/pinjam2"
                        >
                          {" "}
                          Kembali{" "}
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col>
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
                          Ajukan Pinjaman{" "}
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Form>
        </Card>
      </Container>
    );
  }
}
