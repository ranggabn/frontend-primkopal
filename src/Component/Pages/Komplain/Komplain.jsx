import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Input } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";

const api = "http://localhost:3001";

export default function Komplain() {
  const { state } = useContext(AuthContext);
  const [komplain, setkomplain] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampilKomplain").then((res) => {
      setkomplain(res.data.values);
    });
  }, []);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>KRITIK & SARAN</h2>
      <hr />
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Komplain"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Kritik & Saran</th>
          </tr>
        </thead>
        <tbody>
          {komplain
            .filter((komplain) => {
              if (searchTerm === "") {
                return komplain;
              } else if (
                komplain.komplain
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return komplain;
              }
            })
            .map((komplain) => (
              <tr key={komplain.id_komplain}>
                <td className="col-md-3 col-sm-6">{moment(komplain.tanggal).format("YYYY-MM-DD")}</td>
                <td>{komplain.komplain}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
