import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Button,
} from "reactstrap";
import { AuthContext } from "../../../App";

export default function MenuMember() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <Container>
          <NavbarBrand href="/">PRIMKOPAL AAL</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/member" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/toko" className="nav-link">
                  Toko
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/simpan" className="nav-link">
                  Simpan
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/pinjam" className="nav-link">
                  Pinjam
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/kredit" className="nav-link">
                  Kredit
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/tabungan" className="nav-link">
                  Tabungan
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/tampilpinjaman" className="nav-link">
                  Data Pinjaman
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/tampilkredit" className="nav-link">
                  Data Kredit
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
            <Button onClick={() => dispatch({ type: "LOGOUT" })} href="/masuk">Keluar</Button>
            </NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
