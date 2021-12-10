import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Button,
  Container,
} from "reactstrap";
import { AuthContext } from "../../../App";

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" light expand="xl">
        {/* <Container className="container-navbar-admin"> */}
        <NavbarBrand>ADMIN | PRIMKOPAL AAL</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/Home" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftaranggota" className="nav-link">
                Anggota
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pengambilan" className="nav-link">
                Pengambilan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarpenjualan" className="nav-link">
                Penjualan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarbarang" className="nav-link">
                Barang
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarpinjaman" className="nav-link">
                Pinjaman
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarsimpanan" className="nav-link">
                Simpanan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarkredit" className="nav-link">
                Kredit
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/komplain" className="nav-link">
                Kritik & Saran
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="navbar-text-res">
            <Button className="mr-3" href="/ubahprofil">
              Ubah Profil
            </Button>
            <Button onClick={() => dispatch({ type: "LOGOUT" })} href="/masuk">
              Keluar
            </Button>
          </NavbarText>
        </Collapse>
        {/* </Container> */}
      </Navbar>
    </div>
  );
}
