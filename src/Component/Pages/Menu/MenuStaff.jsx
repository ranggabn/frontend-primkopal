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

export default function MenuStaff() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <NavbarBrand href="/">KAPRIM | KASATKER</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/staff" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pinjamsementara" className="nav-link">
                Daftar Pinjaman
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/kreditsementara" className="nav-link">
                Daftar Kredit
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button href="/masuk" onClick={() => dispatch({ type: "LOGOUT" })}>Keluar</Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
