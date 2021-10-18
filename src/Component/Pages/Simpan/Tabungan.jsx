import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Row, Col } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../../App";
import moment from "moment";
import { Redirect, useParams } from "react-router-dom";
import Pdf from "react-to-pdf";

const api = "http://localhost:3001";

export default function Tabungan() {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
  };
  const { state } = useContext(AuthContext);
  let id_user = useParams();
  id_user = state.id;
  const [simpanan, setsimpanan] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilSimpananuser/" + id_user).then((res) => {
      setsimpanan(res.data.values);
      console.log(simpanan);
    });
  }, []);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>Tabungan Sukarela</h2>
      <hr />
      <Row className="float-right mb-3">
        <Col>
          <Pdf targetRef={ref} filename="tabungan.pdf" options={options} x={.5} y={.5}>
            {({ toPdf }) => (
              <Button color="primary" onClick={toPdf}>
                Cetak Tabungan
              </Button>
            )}
          </Pdf>
        </Col>
      </Row>
      <div className="Post" ref={ref}>
        <Table className="table-bordered">
          <thead>
            <tr>
              <th colSpan="4" className="text-center" bgcolor="#BABABA">
                <h5>
                  <b>BUKU TABUNGAN</b>
                </h5>
              </th>
            </tr>
            <tr>
              <th>
                Nama
                <br />
                NRP
                <br />
                Satuan Kerja
              </th>
              <th colSpan="3">
                : {state.user}
                <br />: {state.id}
                <br />: {state.satker}
              </th>
            </tr>
            <tr>
              <th>Tanggal</th>
              <th>Saldo Masuk</th>
              <th>Saldo Akhir</th>
            </tr>
          </thead>
          <tbody>
            {simpanan.map((simpanan) => (
              <tr key={simpanan.id_user}>
                <td>{moment(simpanan.tanggal_simpan).format("YYYY-MM-DD")}</td>
                <td>{simpanan.jumlah_simpanan}</td>
                <td>{simpanan.jumlah_simpanan}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
