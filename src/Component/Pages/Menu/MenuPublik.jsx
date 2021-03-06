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
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Informasi
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/infopembelian">Pembelian</DropdownItem>
                  <DropdownItem href="/infosimpanan">
                    Simpanan Sukarela
                  </DropdownItem>
                  <DropdownItem href="/infokredit">Kredit</DropdownItem>
                  <DropdownItem href="infopinjaman">Pinjaman</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink to="/tokopublik" className="nav-link">
                  Toko
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText className="navbar-text-res">
              <Button className="mr-3" href="/masuk">
                Masuk
              </Button>
              <Button href="/daftar">Daftar</Button>
            </NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
