import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Input } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";
import { numberWithCommasString } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function DaftarKreditSementara(props) {
  const [kredit, setkredit] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampilKredit").then((res) => {
      setkredit(res.data.values);
    });
  }, []);

  function update(id) {
    console.log(id);
    props.history.push("/editstatuskredit/" + id);
  }

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR KREDIT SEMENTARA</h2>
      <hr />
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Nama"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colSpan="8" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian Kredit Anggota</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>NRP / NIP</th>            
            <th>Cicilan (Bulan)</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kredit
            .filter((kredit) => {
              if (searchTerm === "") {
                return kredit;
              } else if (
                kredit.username.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return kredit;
              }
            })
            .map((kredit) => (
              <tr key={kredit.id_kredit}>
                <td>{moment(kredit.tanggal_kredit).format("YYYY-MM-DD")}</td>
                <td>{kredit.username}</td>
                <td>{kredit.id_user}</td>
                <td>Rp. {numberWithCommasString(kredit.besar_cicilan)} ({kredit.cicilan} Bulan)</td>
                <td>Rp. {numberWithCommasString(kredit.harga)}</td>
                <td>{kredit.status ? "Disetujui" : "Belum Disetujui"}</td>
                <td>
                  <Button
                    color="secondary"
                    onClick={() => update(kredit.id_kredit)}
                  >
                    Ubah Status
                  </Button>
                  <span> </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
