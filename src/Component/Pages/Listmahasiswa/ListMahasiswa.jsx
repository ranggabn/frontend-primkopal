import React, { useEffect, useState, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../../App";
import { Redirect } from "react-router";

const api = "http://localhost:3001";

export default function ListMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const { state, dispatch } = useContext(AuthContext);

  const fetchdata = () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
    };

    axios
      .get(api + "auth/api/v1/admin/mahasiswa", config)
      .then((res) => {
        setMahasiswa(res.data.values);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const timeout = () => {
    setTimeout(() => {
      console.log("Token telah berakhir");
      dispatch({
        type: "LOGOUT"
      })
    }, state.tokenExpires)
  }

  useEffect(() => {
      fetchdata()
      // eslint-disable-next-line
      timeout()
      // eslint-disable-next-line
  }, [])

  if(!state.isAuthenticated){
    return <Redirect to="/Login"/>
  }
  return (
    <Container>
      <h2>Data Mahasiswa</h2>
      <hr />
      <Table className="table-bordered">
        <thead>
          <tr>
            <th>NIM</th>
            <th>NAMA</th>
            <th>JURUSAN</th>
            <th>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mahasiswa) => (
            <tr key={mahasiswa.id_mahasiswa}>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.jurusan}</td>
              <td>
                <Button>Edit</Button>
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
