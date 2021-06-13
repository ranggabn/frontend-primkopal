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
} from "reactstrap";
import { AuthContext } from "../../../App";

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <NavbarBrand href="/">ADMIN | PRIMKOPAL AAL</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/admin" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftaranggota" className="nav-link">
                Daftar Anggota
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarpenjualan" className="nav-link">
                Daftar Penjualan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarbarang" className="nav-link">
                Daftar Barang
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarpinjaman" className="nav-link">
                Daftar Pinjaman
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarsimpanan" className="nav-link">
                Daftar Simpanan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/daftarkredit" className="nav-link">
                Daftar Kredit
              </NavLink>
            </NavItem>
            
          </Nav>
          <NavbarText>
            <Button onClick={() => dispatch({ type: "LOGOUT" })} href="/masuk">Keluar</Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
