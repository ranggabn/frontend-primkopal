import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import axios from "axios";
import qs from 'querystring'
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";
import moment from "moment";

const api = "http://localhost:3001";

export default function DaftarSimpanan(props) {
  const { state } = useContext(AuthContext);
  const [simpanan, setSimpanan] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    axios.get(api + "/tampilSimpanan").then((res) => {
      setSimpanan(res.data.values);
    });
  }, []);

  function remove(id) {
    // console.log(id);
    const data = qs.stringify({id_simpanan: id})
    axios.delete(api+"/hapusSimpanan", {
      data: data,
      headers: { "Content-type": "application/x-www-form-urlencoded" }
    }).then(res => {
      console.log(res.data.values);
      const newData = simpanan.filter(simpanan => simpanan.id_simpanan !== id)
      setSimpanan(newData)
    }).catch(err=>console.error(err))
  }

  function update(id) {
    console.log(id);
    props.history.push("/editsimpanan/"+id)
  }

  
  if(!state.isAuthenticated){
    return <Redirect to="/masuk"/>
  }
  return (
    <Container className="mt-5">
      <h2>DAFTAR SIMPANAN</h2>
      <hr />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th colspan="6" className="text-center" bgcolor="#BABABA">
              <h5>
                <b>Rincian Simpanan Anggota</b>
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
                  </DropdownMenu>
                </Dropdown>
              </h5>
            </th>
          </tr>
          <tr>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>NRP / NIP</th>
            <th>Jumlah Simpanan</th>
            <th>Terbilang</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {simpanan.map((simpanan) => (
            <tr key={simpanan.id_simpanan}>
              <td>{moment(simpanan.tanggal_simpan).format('YYYY-MM-DD')}</td>
              <td>{simpanan.username}</td>
              <td>{simpanan.id_user}</td>
              <td>{simpanan.jumlah_simpanan}</td>
              <td>{simpanan.terbilang}</td>
              <td>
              <Button
                  color="secondary"
                  onClick={() => update(simpanan.id_simpanan)}
                >
                  Detail
                </Button>
                <span> </span>
                <Button color="danger" onClick={() => remove(simpanan.id_simpanan)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
