import React, { useState, useEffect } from "react";
import { Input, Button, Alert } from "reactstrap";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";

const api = "http://localhost:3001";

export default function Kontak() {
  const [komplain, setKomplain] = useState([]);
  const [data, setData] = useState({
    komplain: "",
    tanggal: "",
  });
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setData({
      tanggal: moment().format("YYYY-MM-DD"),
    });
  }, []);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    e.preventDefault();
    axios.post(api + "/tambahKomplain", data).then((res) => {
      const myData = [...komplain, res.data.values, visible];
      setKomplain(myData);
      setVisible(myData);
      setData({
        komplain: "",
      });
    });
  }

  return (
    <FooterContainer className="main-footer mt-5">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Kontak</h4>
              <ul className="list-unstyled">
                <li className="text-justify mb-2">
                  <i class="fa fa-map-marker" aria-hidden="true">
                    &ensp; Bumi Moro, Morokrembangan, Krembangan, Surabaya City,
                    East Java 60178
                  </i>
                </li>
                <li className="mb-2">
                  <i class="fa fa-phone" aria-hidden="true">
                    &ensp; Whatsapp. (031) 3291092
                  </i>
                </li>
                <li className="mb-2">
                  <i class="fa fa-whatsapp" aria-hidden="true">
                    &ensp; Telp. (031) 3291092
                  </i>
                </li>
                <li className="mb-2">
                  <i class="fa fa-envelope" aria-hidden="true">
                    &ensp; primkopalaal@gmail.com
                  </i>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Layanan</h4>
              <ul className="ml-4">
                <li className="mb-2">
                  <a href="/daftar">Daftar Anggota</a>
                </li>
                <li className="mb-2">
                  <a href="/toko">Pembelian Barang</a>
                </li>
                <li className="mb-2">
                  <a href="/simpan">Simpanan Sukarela</a>
                </li>
                <li className="mb-2">
                  <a href="/kredit">Kredit Barang</a>
                </li>
                <li className="mb-2">
                  <a href="/pinjam">Pinjaman Dana</a>
                </li>
                <li className="mb-2">
                  <a href="/tabungan">Lihat Tabungan</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Informasi</h4>
              <ul className="ml-4">
                <li className="mb-2">
                  <a href="/infopembelian">Pembelian Barang</a>
                </li>
                <li className="mb-2">
                  <a href="/infosimpanan">Simpanan Sukarela</a>
                </li>
                <li className="mb-2">
                  <a href="/infokredit">Kredit Barang</a>
                </li>
                <li className="mb-2">
                  <a href="/infopinjaman">Pinjaman Dana</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Kritik & Saran</h4>
              <ul className="list-unstyled">
                <li>
                  <Input
                    type="textarea"
                    id="txtbox"
                    name="komplain"
                    value={data.komplain}
                    onChange={(e) => handle(e)}
                    placeholder="Kami sangat menerima kritik dan saran anda."
                  />
                </li>
                <Alert color="info" isOpen={visible} toggle={onDismiss} className="mt-2">
                  Kritik & Saran Anda Berhasil Terkirim.
                </Alert>
                <li className="mt-2">
                  <Button type="submit" onClick={(e) => submit(e)} block>
                    Kirim
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Primkopal AAL Surabaya - All
              Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  .footer-middle {
    background: var(--mainDark);
    padding-top: 3rem;
    color: var(--mainWhite);
  }

  .footer-bottom {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  ul li a {
    color: var(--mainGrey);
  }

  ul li a:hover {
    color: var(--mainLightGrey);
  }

  #txtbox {
    font-size: 11pt;
    height: 120px;
    width: 255px;
  }
`;
