import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table } from "reactstrap";
import axios from "axios";
import qs from 'querystring'
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function DaftarKredit() {
  const [mahasiswa, setMahasiswa] = useState([]);

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
            <th colspan="7" className="text-center" bgcolor="#BABABA">
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
            <th>Harga Barang</th>
            <th>Lama Cicilan</th>
            <th>Status Kredit</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mahasiswa) => (
            <tr key={mahasiswa.id_mahasiswa}>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.nama}</td>
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
