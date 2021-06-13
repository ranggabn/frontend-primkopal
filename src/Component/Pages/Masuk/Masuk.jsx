import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import {
  Container,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  Button,
  FormText,
  Form,
} from "reactstrap";
import { AuthContext } from "../../../App";

const qs = require("querystring");
const api = "http://localhost:3001";

export default function Masuk(props) {
  const { dispatch } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(api + "/auth/api/v1/login", qs.stringify(requestBody), config)
      .then((res) => {
        if (res.data.success === true) {
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });

          props.history.push("/Home");
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: res.data.Message,
          });
        }

        throw res;
      });
  };

  return (
    <Fragment>
      <Container className="mt-5">
        <Row>
          <Col>
            <h3 className="text-center">
              <b>MASUK</b>
            </h3>
          </Col>
        </Row>
        <Card className="container mt-3">
          <Row className="justify-content-md-center">
            <Col xs={6}>
              <Form className="mt-4" onSubmit={handleFormSubmit}>
                <Label>NRP / NIP</Label>
                <FormGroup>
                  <Row>
                    <Col>
                      <Input
                        type="email"
                        name="nrp"
                        value={data.email}
                        onChange={handleInputChange}
                        name="email"
                        id="exampleEmail"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Label>Kata Sandi</Label>
                <FormGroup>
                  <Row>
                    <Col>
                      <Input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        name="password"
                        id="examplePassword"
                      />
                    </Col>
                  </Row>
                </FormGroup>

                {data.errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {data.errorMessage}
                  </div>
                )}

                <Button color="primary" disabled={data.isSubmitting}>
                  {data.isSubmitting ? "...loading" : "Masuk"}
                </Button>
                <br />
                <br />
                <hr />
                <FormGroup>
                  <FormText className="text-center">
                    Belum mendaftar sebagai anggota Primkopal? Silahkan daftar
                    disini
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col>
                      <Button
                        color="secondary"
                        className="mt-3 mb-4"
                        type="button"
                        href="/daftar"
                        block
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
    </Fragment>
  );
}
