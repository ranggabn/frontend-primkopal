import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";

const api = "http://localhost:3001";

export default function DaftarPinjaman(props) {
  const [pinjaman, setpinjaman] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
        const newData = pinjaman.filter((pinjaman) => pinjaman.id_pinjaman !== id);
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
      <Button
        color="success"
        href="/tambahPinjaman"
        className="mt-1 mb-3 float-right"
      >
        Tambah Data pinjaman
      </Button>
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colSpan="8" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian pinjaman Anggota</b>
                <Dropdown
                  group
                  size="sm"
                  className="float-right"
                  isOpen={dropdownOpen}
                  toggle={toggle}
                >
                  <DropdownToggle caret>Urutkan Berdasarkan</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Tanggal</DropdownItem>
                    <DropdownItem>Nama</DropdownItem>
                    <DropdownItem>NRP / NIP</DropdownItem>
                    <DropdownItem>Status</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pinjaman.map((pinjaman) => (
            <tr key={pinjaman.id_pinjaman}>
              <td>{moment(pinjaman.tanggal_pinjam).format('YYYY-MM-DD')}</td>
              <td>{pinjaman.username}</td>
              <td>{pinjaman.id_user}</td>
              <td>{pinjaman.besar_pinjaman}</td>
              <td>{pinjaman.besar_cicilan}</td>
              <td>{pinjaman.cicilan} Bulan</td>
              <td>{pinjaman.status}</td>
              <td>
                <Button
                  color="secondary"
                  onClick={() => update(pinjaman.id_pinjaman)}
                >
                  Detail
                </Button>
                <span> </span>
                <Button color="danger" onClick={() => remove(pinjaman.id_pinjaman)}>
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
