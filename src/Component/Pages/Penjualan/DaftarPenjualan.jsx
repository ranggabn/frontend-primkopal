import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table } from "reactstrap";
import axios from "axios";
import qs from 'querystring'
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";

const api = "http://localhost:3001";

export default function DaftarPenjualan() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    axios.get(api + "/tampil").then((res) => {
      setMahasiswa(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({id_mahasiswa: id})
    axios.delete(api+"/hapus", {
      data: data,
      headers: { "Content-type": "application/x-www-form-urlencoded" }
    }).then(res => {
      console.log(res.data.values);
      const newData = mahasiswa.filter(mahasiswa => mahasiswa.id_mahasiswa !== id)
      setMahasiswa(newData)
    }).catch(err=>console.error(err))
  }

  if(!state.isAuthenticated){
    return <Redirect to="/masuk"/>
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR PENJUALAN</h2>
      <hr />
      <Button
        color="success"
        href="/tambahpenjualan"
        className="mt-1 mb-3 float-right"
      >
        Tambah Penjualan
      </Button>
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colspan="4" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian Penjualan</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th>Tanggal</th>
            <th>List Barang</th>
            <th>Harga</th>
            <th>Keterangan Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mahasiswa) => (
            <tr key={mahasiswa.id_mahasiswa}>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.jurusan}</td>
              <td>
                <span> </span>
                <Button color="danger" onClick={() => remove(mahasiswa.id_mahasiswa)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
