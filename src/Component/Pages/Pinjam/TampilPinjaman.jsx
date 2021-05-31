import React, { Component } from "react";
import { Container, Alert, Button, Table, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "querystring";

const api = "http://localhost:3001";

export default class Tabungan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mahasiswa: [],
      response: "",
      display: "none",
    };
  }

  componentDidMount() {
    axios.get(api + "/tampil").then((res) => {
      this.setState({
        mahasiswa: res.data.values,
      });
    });
  }

  deleteMahasiswa = (idMahasiswa) => {
    const { mahasiswa } = this.state;
    const data = qs.stringify({
      id_mahasiswa: idMahasiswa,
    });

    axios
      .delete(api + "/hapus", {
        data: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((json) => {
        if (json.data.status === 200) {
          this.setState({
            response: json.data.values,
            mahasiswa: mahasiswa.filter(
              (mahasiswa) => mahasiswa.id_mahasiswa !== idMahasiswa
            ),
            display: "block",
          });
          this.props.history.push("/mahasiswa");
        } else {
          this.setState({
            response: json.data.values,
            display: "block",
          });
        }
      });
  };

  render() {
    return (
      <Container className="mt-5">
        <h2>Data Pinjaman</h2>
        <Alert color="success" style={{ display: this.state.display }}>
          {this.state.response}
        </Alert>
        <hr />
        <Table className="table-bordered">
          <thead>
            <tr>
              <th colspan="4" className="text-center" bgcolor="#BABABA">
                <h5><b>RINCIAN PINJAMAN</b></h5>
              </th>
            </tr>
            <tr>
              <th>
                Nama
                <br/>
                NRP  
                <br/>
                Satuan Kerja
              </th>
              <th colspan="3">
                : Rangga Baghas Nugroho
                <br/>
                : 175150200111062
                <br/>
                : Teknik Informatika
              </th>
            </tr>
            <tr>
              <th>Tanggal</th>
              <th>Cicilan ke - </th>
              <th>Jumlah Pembayaran</th>
              <th>Total Pinjaman</th>
            </tr>
          </thead>
          <tbody>
            {this.state.mahasiswa.map((mahasiswa) => (
              <tr key={mahasiswa.id_mahasiswa}>
                <td>{mahasiswa.nim}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.jurusan}</td>
                <td>
                  <span> </span>
                  <Button
                    onClick={() => this.deleteMahasiswa(mahasiswa.id_mahasiswa)}
                    color="danger"
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
}
