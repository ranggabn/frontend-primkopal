import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";

const api = "http://localhost:3001";

export default function DaftarBarang(props) {
  const [barang, setbarang] = useState([]);

  useEffect(() => {
    axios.get(api + "/tampilBarang").then((res) => {
      setbarang(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({id_barang: id})
    axios.delete(api+"/hapusBarang", {
      data: data,
      headers: { "Content-type": "application/x-www-form-urlencoded" }
    }).then(res => {
      console.log(res.data.values);
      const newData = barang.filter(barang => barang.id_barang !== id)
      setbarang(newData)
    }).catch(err=>console.error(err))
  }

  function update(id) {
    console.log(id);
    props.history.push("/editbarang/" + id);
  }

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR BARANG</h2>
      <hr />
      <Button
        color="success"
        href="/tambahbarang"
        className="mt-1 mb-3 float-right"
      >
        Tambah Barang
      </Button>
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colSpan="6" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian Data Barang</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th>Nama Barang</th>
            <th>Harga</th>
            <th>Keterangan</th>
            <th>Kategori</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((barang) => (
            <tr key={barang.id_barang}>
              <td>{barang.nama}</td>
              <td>{barang.harga}</td>
              <td>{barang.keterangan}</td>
              <td>{barang.kategori_barang}</td>
              <td>{barang.status_barang}</td>
              <td>
                <Button
                  color="secondary"
                  onClick={() => update(barang.id_barang)}
                >
                  Edit
                </Button>
                <span> </span>
                <Button
                  color="danger"
                  onClick={() => remove(barang.id_barang)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
