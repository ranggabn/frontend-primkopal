import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";
import { numberWithCommasString } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function DaftarPinjaman(props) {
  const [pinjaman, setpinjaman] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampilPinjaman").then((res) => {
      setpinjaman(res.data.values);
    });
  }, []);

  function remove(id) {
    const data = qs.stringify({ id_pinjaman: id });
    axios
      .delete(api + "/hapusPinjaman", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data.values);
        const newData = pinjaman.filter(
          (pinjaman) => pinjaman.id_pinjaman !== id
        );
        setpinjaman(newData);
      })
      .catch((err) => console.error(err));
  }

  function update(id) {
    console.log(id);
    props.history.push("/editPinjaman/" + id);
  }

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR PINJAMAN</h2>
      <hr />
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Nama Peminjam"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
      <div className="table-all-after-lgn">
        <Table className="table-bordered">
          <thead>
            <tr>
              <th colSpan="10" className="text-center" bgcolor="#BABABA">
                <h5>
                  <b>Rincian pinjaman Anggota</b>
                </h5>
              </th>
            </tr>
            <tr>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>NRP / NIP</th>
              <th>Jumlah Pinjaman</th>
              <th>Cicilan / Bulan</th>
              <th>Lama Cicilan</th>
              <th>Status Kaprim</th>
              <th>Status Kasatker</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pinjaman
              .filter((pinjaman) => {
                if (searchTerm === "") {
                  return pinjaman;
                } else if (
                  pinjaman.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return pinjaman;
                }
              })
              .map((pinjaman) => (
                <tr key={pinjaman.id_pinjaman}>
                  <td>
                    {moment(pinjaman.tanggal_pinjam).format("YYYY-MM-DD")}
                  </td>
                  <td>{pinjaman.username}</td>
                  <td>{pinjaman.id_user}</td>
                  <td>Rp. {numberWithCommasString(pinjaman.besar_pinjaman)}</td>
                  <td>Rp. {numberWithCommasString(pinjaman.besar_cicilan)}</td>
                  <td>{pinjaman.cicilan} Bulan</td>
                  <td>
                    {pinjaman.status_kaprim ? "Disetujui" : "Belum Disetujui"}
                  </td>
                  <td>
                    {pinjaman.status_kasatker ? "Disetujui" : "Belum Disetujui"}
                  </td>
                  <td>
                    <Button
                      color="secondary"
                      onClick={() => update(pinjaman.id_pinjaman)}
                    >
                      Detail
                    </Button>
                    <span> </span>
                    <Button
                      color="danger"
                      onClick={() => remove(pinjaman.id_pinjaman)}
                    >
                      Hapus
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
