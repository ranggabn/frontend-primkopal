import React from "react";
import { NavDropdown, Nav, Navbar, Form, Button } from "react-bootstrap";

const NavbarComp = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="#home">PRIMKOPAL AAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Beranda</Nav.Link>
            <NavDropdown title="Profil" id="basic-nav-dropdown">
              <NavDropdown.Item href="/visimisi">Visi & Misi</NavDropdown.Item>
              <NavDropdown.Item href="/struktur">
                Struktur Organisasi
              </NavDropdown.Item>
              <NavDropdown.Item href="/kontak">Kontak</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/toko">Toko</Nav.Link>
            <Nav.Link href="/simpan">Simpan</Nav.Link>
            <Nav.Link href="/pinjam">Pinjam</Nav.Link>
            <Nav.Link href="/kredit">Kredit</Nav.Link>
            <Nav.Link href="/tabungan">Tabungan</Nav.Link>
            <Nav.Link href="/tampilpinjaman">Data Pinjaman</Nav.Link>
            <Nav.Link href="/tampilkredit">Data Kredit</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-light mr-3" href="/masuk">
              Masuk
            </Button>
            <Button variant="outline-light" href="/daftar">
              Daftar
            </Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComp;
