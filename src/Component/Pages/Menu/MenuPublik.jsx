import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  Container,
} from "reactstrap";

export default function MenuPublik() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <Container>
          <NavbarBrand href="/">PRIMKOPAL AAL</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Beranda
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Profil
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/visimisi">Visi & Misi</DropdownItem>
                  <DropdownItem href="/struktur">
                    Struktur Organisasi
                  </DropdownItem>
                  <DropdownItem href="/kontak">Kontak</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink to="/toko" className="nav-link">
                  Toko
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Button className="mr-3" href="/masuk">Masuk</Button>
              <Button href="/daftar">Daftar</Button>
            </NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
