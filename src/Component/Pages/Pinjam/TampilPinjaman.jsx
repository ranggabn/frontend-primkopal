import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { AuthContext } from "../../../App";
import moment from 'moment'
import { numberWithCommas } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function TampilPinjaman() {
  const { state } = useContext(AuthContext);
  let id_user  = useParams()
  id_user = state.id
  const [pinjaman, setpinjaman] = useState([])

  useEffect(() => {
    axios.get(api + "/tampilPinjamanUser/" + id_user).then((res) => {
      setpinjaman(res.data.values);
      console.log(pinjaman);
    });
  }, []);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
        <h2>Data Pinjaman</h2>
        <hr />
        <Table className="table-bordered">
          <thead>
            <tr>
              <th colSpan="10" className="text-center" bgcolor="#BABABA">
                <h5><b>RINCIAN PINJAMAN</b></h5>
              </th>
            </tr>
            <tr>
              <th>
                Nama
                <br/>
                NRP  
                <br/>
                Satuan Kerja
              </th>
              <th colSpan="10">
                : {state.user}
                <br/>
                : {state.id}
                <br/>
                : {state.satker}
              </th>
            </tr>
            <tr>
              <th>Tanggal Awal Pinjaman</th>
              <th>Lama Cicilan</th>
              <th>Jumlah Pembayaran / Bulan</th>
              <th>Total Pinjaman</th>
              <th>Status Kaprim</th>
              <th>Status Kasatker</th>
            </tr>
          </thead>
          <tbody>
          {pinjaman.map((pinjaman) => (
            <tr key={pinjaman.id_pinjaman}>
              <td>{moment(pinjaman.tanggal_pinjam).format('YYYY-MM-DD')}</td>
              <td>{pinjaman.id_cicil} Bulan</td>
              <td>Rp. {numberWithCommas(pinjaman.besar_cicilan)}</td>
              <td>Rp. {numberWithCommas(pinjaman.besar_pinjaman)}</td>
              <td>{pinjaman.status_kaprim ? "Disetujui" : "Belum Disetujui"}</td>
              <td>{pinjaman.status_kasatker ? "Disetujui" : "Belum Disetujui"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
  )
}