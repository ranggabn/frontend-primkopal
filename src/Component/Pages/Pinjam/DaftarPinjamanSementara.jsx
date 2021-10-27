import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Input } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";
import { numberWithCommasString } from "../../Fungsional/Koma";

const api = "http://localhost:3001";

export default function DaftarPinjamanSementara(props) {
  const [pinjaman, setpinjaman] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampilPinjaman").then((res) => {
      setpinjaman(res.data.values);
    });
  }, []);

  function update(id) {
    console.log(id);
    props.history.push("/editstatuspinjam/" + id);
  }

  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR PINJAMAN SEMENTARA</h2>
      <hr />
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Nama"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
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
            <th>Cicilan (Bulan)</th>            
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
                <td>{moment(pinjaman.tanggal_pinjam).format("YYYY-MM-DD")}</td>
                <td>{pinjaman.username}</td>
                <td>{pinjaman.id_user}</td>
                <td>Rp. {numberWithCommasString(pinjaman.besar_pinjaman)}</td>
                <td>Rp. {numberWithCommasString(pinjaman.besar_cicilan)} ({pinjaman.cicilan} Bulan)</td>                
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
                    Ubah Status
                  </Button>
                  <span> </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
