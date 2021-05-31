import React, { useState, useEffect, useContext } from "react";
import { Container, Alert, Button, Table, NavLink } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../../App";

const api = "http://localhost:3001";

export default function TampilKredit() {

  const { state } = useContext(AuthContext);

  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampil").then((res) => {
      setMahasiswa(res.data.values);
    });
  }, []);

  return (
    <Container className="mt-5">
      <h2>Data Kredit</h2>
      <hr />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colspan="4" className="text-center" bgcolor="#BABABA">
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
            <th colspan="3">
              : {state.user}
              <br />
              : 175150200111062
              <br />
              : Teknik Informatika
            </th>
          </tr>
          <tr>
            <th>Tanggal</th>
            <th>Cicilan ke - </th>
            <th>Jumlah Pembayaran</th>
            <th>Total Harga Kredit</th>
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
                <Button color="danger">Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}