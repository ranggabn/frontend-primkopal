import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../App";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

const qs = require("querystring");
const api = "http://localhost:3001";

export default function Login(props) {
  const { dispatch } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name] : event.target.value,
    });
  };

  const handleFormSubmit = event => {
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

          props.history.push("/Home")
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
      <Container>
        <br />
        <Row>
          <Col>
            <CardImg top width="100%" src="https://placeimg.com/640/480/tech" alt="Card image cap" />
          </Col>
          <Col>
          <h1>Login Form</h1>
          <hr/>
            <Form onSubmit={handleFormSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  value={data.email}
                  onChange={handleInputChange}
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  value={data.password}
                  onChange={handleInputChange}
                  name="password"
                  id="examplePassword"
                  placeholder="password placeholder"
                />
              </FormGroup>

              {data.errorMessage && (
                  <div className="alert alert-danger" role="alert">
                      {data.errorMessage}
                  </div>
              )}
              <Button disabled={data.isSubmitting}>
                  {data.isSubmitting ? (
                      "...loading"
                  ) :
                  (
                      "Login"
                  )}
              </Button>
            </Form>
            <br/>
            <p>Belum punya akun? <Link to="/Register">Daftar</Link></p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
