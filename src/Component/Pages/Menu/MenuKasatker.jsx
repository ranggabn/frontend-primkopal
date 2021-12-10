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

export default function MenuKasatker() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <NavbarBrand>KETUA SATUAN KERJA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/Home" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pinjamsementara" className="nav-link">
                Daftar Pinjaman
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="navbar-text-res">
            <Button className="mr-3" href="/ubahprofil">
              Ubah Profil
            </Button>
            <Button href="/masuk" onClick={() => dispatch({ type: "LOGOUT" })}>
              Keluar
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
