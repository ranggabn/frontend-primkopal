import React, { useState, useEffect, useContext } from "react";
import { Container, Table } from "reactstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";
import moment from 'moment'
import { numberWithCommas } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function TampilKredit() {
  const { state } = useContext(AuthContext);
  let id_user  = useParams()
  id_user = state.id
  const [kredit, setkredit] = useState([])

  useEffect(() => {
    axios.get(api + "/tampilKreditUser/" + id_user).then((res) => {
      setkredit(res.data.values);
      console.log(kredit);
    });
    
  }, []);
  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>Data Kredit</h2>
      <hr />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colSpan="10" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>RINCIAN KREDIT</b>
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
            <th colSpan="10">
              : {state.user}
              <br />
              : {state.id}
              <br />
              : {state.satker}
            </th>
          </tr>
          <tr>
            <th>Tanggal Awal Kredit</th>
            <th>Lama Cicilan</th>
            <th>Cicilan / Bulan</th>
            <th>Nama Barang</th>
            <th>Total Kredit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {kredit.map((kredit) => (
            <tr key={kredit.id_user}>
              <td>{moment(kredit.tanggal_kredit).format('YYYY-MM-DD')}</td>
              <td>{kredit.id_cicil} Bulan</td>
              <td>Rp. {numberWithCommas(kredit.besar_cicilan)}</td>
              <td>{kredit.nama_barang}</td>              
              <td>Rp. {numberWithCommas(kredit.harga)}</td>
              <td>{kredit.status ? "Disetujui" : "Belum Disetujui"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}