import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";
import { numberWithCommasString } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function Pengambilan(props) {
  const { state } = useContext(AuthContext);
  const [pengambilan, setpengambilan] = useState([]);
  const [data, setdata] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampilPengambilan").then((res) => {
      setpengambilan(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({ id_pengambilan: id });
    axios
      .delete(api + "/hapusPengambilan", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data.values);
        const newData = pengambilan.filter(
          (pengambilan) => pengambilan.id_pengambilan !== id
        );
        setpengambilan(newData);
      })
      .catch((err) => console.error(err));
  }

  function sudah(id) {
    const newData = { ...data, id_pengambilan: id };
    setdata(newData);
    axios
      .get(api + "/tampilPengambilan/" + newData.id_pengambilan)
      .then((res) => {
        const response = res.data.values[0];
        axios.post(api + "/tambahJual", response);
        remove(newData.id_pengambilan);
      });
  }

  function batal(id) {
    const newData = { ...data, id_pengambilan: id };
    setdata(newData);
    axios
      .get(api + "/tampilPengambilan/" + newData.id_pengambilan)
      .then((res) => {
        const response = res.data.values[0];
        axios.get(api + "/tampilBarang/" + response.id_barang).then((res) => {
          const barang = res.data.values[0];
          const dataBaru = {
            id_barang: barang.id_barang,
            stok: barang.stok + response.jumlah,
          };
          axios.put(api + "/ubahBarang2", dataBaru);
        });
      });
    remove(newData.id_pengambilan);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR PENGAMBILAN BARANG</h2>
      <hr />
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Nama Barang"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
      <div className="table-all-after-lgn">
        <Table className="table-bordered">
          <thead>
            <tr>
              <th colSpan="7" className="text-center" bgcolor="#BABABA">
                <h5>
                  <b>Rincian Barang</b>
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
            {pengambilan
              .filter((pengambilan) => {
                if (searchTerm === "") {
                  return pengambilan;
                } else if (
                  pengambilan.nama
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return pengambilan;
                }
              })
              .map((pengambilan) => (
                <tr key={pengambilan.id_pengambilan}>
                  <td>
                    {moment(pengambilan.tanggal_penjualan).format("YYYY-MM-DD")}
                  </td>
                  <td>{pengambilan.nama}</td>
                  <td>{pengambilan.jumlah}</td>
                  <td>{pengambilan.username}</td>
                  <td>
                    Rp. {numberWithCommasString(pengambilan.jumlah_harga)}
                  </td>
                  <td>{pengambilan.status ? "Lunas" : "Hutang"}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => batal(pengambilan.id_pengambilan)}
                    >
                      Batal
                    </Button>
                    <span> </span>
                    <Button
                      color="success"
                      onClick={() => sudah(pengambilan.id_pengambilan)}
                    >
                      Sudah
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
