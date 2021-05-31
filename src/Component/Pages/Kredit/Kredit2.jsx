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

export default class Kredit2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cicilan: "",
      totalcicilan: "",
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
        <br />
        <h3 className="text-center">
          <b>PERMOHONAN KREDIT</b>
        </h3>
        <h6 className="text-center">(SEPEDA / BARANG / ELEKTRONIK)</h6>
        <Card className="mt-5">
          <Form className="form mt-4 mb-4">
            <Col>
              <FormGroup>
                <Label for="exampleSelect">Lama Cicilan</Label>
                <Input type="select" name="cicilan" onChange={this.handleChange}>                  
                  <option value={this.state.cicilan} disabled selected>Pilih Cicilan</option>
                  <option value={this.state.cicilan}>3 Bulan</option>
                  <option value={this.state.cicilan}>6 Bulan</option>
                  <option value={this.state.cicilan}>12 Bulan</option>
                </Input>
              </FormGroup>
              <Label>Jumlah Cicilan / Bulan</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input type="text" name="totalcicilan" value={this.state.totalcicilan} onChange={this.handleChange} disabled/>
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Button className="fa fa-chevron-left mt-3" type="button" onClick={this.addMahasiswa} href="/kredit">{" "}Kembali{" "}</Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Button color="primary" className="mt-3 float-right" type="button" onClick={this.addMahasiswa} href="/kredit2">{" "}Ajukan Kredit{" "}</Button>
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
