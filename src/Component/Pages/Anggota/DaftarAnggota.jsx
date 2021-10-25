import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";

const api = "http://localhost:3001";

export default function DaftarAnggota(props) {
  const { state } = useContext(AuthContext);
  const [user, setuser] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    axios.get(api + "/tampil").then((res) => {
      setuser(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({ id: id });
    axios
      .delete(api + "/hapus", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data.values);
        const newData = user.filter((user) => user.id !== id);
        setuser(newData);
      })
      .catch((err) => console.error(err));
  }

  function update(id) {
    console.log(id);
    props.history.push("/editanggota/" + id);
  }

  if (!state.isAuthenticated) {
    return <Redirect to="/masuk" />;
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR ANGGOTA</h2>
      <hr />
      <Button
        color="success"
        href="/tambahanggota"
        className="mt-1 mb-3 float-right"
      >
        Tambah Anggota
      </Button>
      <Input
        type="text"
        className="mb-3"
        placeholder="Cari Nama Anggota"
        onChange={(event) => {
          setsearchTerm(event.target.value);
        }}
      />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colSpan="6" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian Data Anggota</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th>Tanggal Daftar</th>
            <th>NRP / NIP</th>
            <th>Nama Lengkap</th>
            <th>Satuan Kerja</th>
            <th>Nomor Telefon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {user
            .filter((user) => {
              if (searchTerm === "") {
                return user;
              } else if (
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return user;
              }
            })
            .map((user) => (
              <tr key={user.id}>
                <td>{moment(user.tanggal_daftar).format("YYYY-MM-DD")}</td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.satker}</td>
                <td>{user.nomor_telefon}</td>
                <td>
                  <Button color="secondary" onClick={() => update(user.id)}>
                    Edit
                  </Button>
                  <span> </span>
                  <Button color="danger" onClick={() => remove(user.id)}>
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
