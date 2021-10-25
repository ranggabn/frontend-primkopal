import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";
import { numberWithCommasString } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function DaftarPenjualan(props) {
  const { state } = useContext(AuthContext);
  const [penjualan, setpenjualan] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampilJual").then((res) => {
      setpenjualan(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({ id_penjualan: id });
    axios
      .delete(api + "/hapusJual", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data.values);
        const newData = penjualan.filter(
          (penjualan) => penjualan.id_penjualan !== id
        );
        setpenjualan(newData);
      })
      .catch((err) => console.error(err));
  }

  function update(id) {
    console.log(id);
    props.history.push("/editpenjualan/" + id);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR PENJUALAN</h2>
      <hr />
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Nama Barang"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colSpan="7" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian Penjualan</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th>Tanggal</th>
            <th>List Barang</th>
            <th>Jumlah Barang</th>
            <th>Nama Pembeli</th>
            <th>Jumlah Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {penjualan
            .filter((penjualan) => {
              if (searchTerm === "") {
                return penjualan;
              } else if (
                penjualan.nama.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return penjualan;
              }
            })
            .map((penjualan) => (
              <tr key={penjualan.id_penjualan}>
                <td>
                  {moment(penjualan.tanggal_penjualan).format("YYYY-MM-DD")}
                </td>
                <td>{penjualan.nama}</td>
                <td>{penjualan.jumlah}</td>
                <td>{penjualan.username}</td>
                <td>Rp. {numberWithCommasString(penjualan.jumlah_harga)}</td>
                <td>{penjualan.status ? "Lunas" : "Hutang"}</td>
                <td>
                <Button
                    color="secondary"
                    onClick={() => update(penjualan.id_penjualan)}                    
                  >
                    Edit
                  </Button>
                  <span> </span>
                  <Button
                    color="danger"
                    onClick={() => remove(penjualan.id_penjualan)}
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
