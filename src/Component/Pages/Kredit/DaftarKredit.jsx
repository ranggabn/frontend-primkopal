import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table } from "reactstrap";
import axios from "axios";
import qs from 'querystring'
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";

const api = "http://localhost:3001";

export default function DaftarKredit(props) {
  const [kredit, setkredit] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilKredit").then((res) => {
      setkredit(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({id_kredit: id})
    axios.delete(api+"/hapusKredit", {
      data: data,
      headers: { "Content-type": "application/x-www-form-urlencoded" }
    }).then(res => {
      console.log(res.data.values);
      const newData = kredit.filter(kredit => kredit.id_kredit !== id)
      setkredit(newData)
    }).catch(err=>console.error(err))
  }

  function update(id) {
    console.log(id);
    props.history.push("/editkredit/"+id)
  }

  const { state } = useContext(AuthContext);
  
  if(!state.isAuthenticated){
    return <Redirect to="/masuk"/>
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR KREDIT</h2>
      <hr />
      <Button
        color="success"
        href="/tambahkredit"
        className="mt-1 mb-3 float-right"
      >
        Tambah Data Kredit
      </Button>
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
            <th>Nama Barang</th>
            <th>Cicilan / Bulan</th>
            <th>Lama Cicilan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kredit.map((kredit) => (
            <tr key={kredit.id_kredit}>
              <td>{kredit.tanggal_kredit}</td>
              <td>{kredit.username}</td>
              <td>{kredit.id_user}</td>
              <td>{kredit.nama_barang}</td>
              <td>{kredit.harga}</td>
              <td>{kredit.cicilan}</td>
              <td>{kredit.status}</td>
              <td>
              <Button
                  color="secondary"
                  onClick={() => update(kredit.id_kredit)}
                >
                  Edit
                </Button>
                <span> </span>
                <Button color="danger" onClick={() => remove(kredit.id_kredit)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
