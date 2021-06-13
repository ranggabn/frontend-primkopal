import React, { useReducer, createContext } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavbarComp from "./Component/Fungsional/NavbarComp";
import Home from "./Component/Pages/Home/Home";
import Footer from "./Component/Fungsional/Footer";
import Visimisi from "./Component/Pages/Profil/Visimisi";
import Kredit1 from "./Component/Pages/Kredit/Kredit1";
import Kredit2 from "./Component/Pages/Kredit/Kredit2";
import Masuk from "./Component/Pages/Masuk/Masuk";
import Daftar from "./Component/Pages/Daftar/Daftar";
import Simpan from "./Component/Pages/Simpan/Simpan";
import Pinjam1 from "./Component/Pages/Pinjam/Pinjam1";
import Pinjam2 from "./Component/Pages/Pinjam/Pinjam2";
import Pinjam3 from "./Component/Pages/Pinjam/Pinjam3";
import Tabungan from "./Component/Pages/Simpan/Tabungan";
import TampilPinjaman from "./Component/Pages/Pinjam/TampilPinjaman";
import TampilKredit from "./Component/Pages/Kredit/TampilKredit";
import Produk from "./Component/Pages/Toko/Produk";
import MenuComp from "./Component/Pages/Menu/MenuComp";
import HomeComp from "./Component/Pages/HomeComp/HomeComp";
import Register from "./Component/Pages/Register/Register";
import RoleAdmin from "./Component/Pages/RoleAkses/RoleAdmin";
import RoleMember from "./Component/Pages/RoleAkses/RoleMember";
import RoleStaff from "./Component/Pages/RoleAkses/RoleStaff";
import DaftarAnggota from "./Component/Pages/Anggota/DaftarAnggota";
import DaftarPinjaman from "./Component/Pages/Pinjam/DaftarPinjaman";
import DaftarBarang from "./Component/Pages/Barang/DaftarBarang";
import DaftarSimpanan from "./Component/Pages/Simpan/DaftarSimpanan";
import DaftarKredit from "./Component/Pages/Kredit/DaftarKredit";
import DaftarPenjualan from "./Component/Pages/Penjualan/DaftarPenjualan";
import DaftarPinjamanSementara from "./Component/Pages/Pinjam/DaftarPinjamanSementara";
import DaftarKreditSementara from "./Component/Pages/Kredit/DaftarKreditSementara";
import EditAnggota from "./Component/Pages/Anggota/EditAnggota";
import TambahAnggota from "./Component/Pages/Anggota/TambahAnggota";
import TambahKredit from "./Component/Pages/Kredit/TambahKredit";
import TambahPenjualan from "./Component/Pages/Penjualan/TambahPenjualan";
import TambahBarang from "./Component/Pages/Barang/TambahBarang";
import TambahPinjaman from "./Component/Pages/Pinjam/TambahPinjaman";
import TambahSimpanan from "./Component/Pages/Simpan/TambahSimpanan";
import EditBarang from "./Component/Pages/Barang/EditBarang";
import EditKredit from "./Component/Pages/Kredit/EditKredit";
import EditPenjualan from "./Component/Pages/Penjualan/EditPenjualan";
import EditPinjaman from "./Component/Pages/Pinjam/EditPinjaman";
import EditSimpanan from "./Component/Pages/Simpan/EditSimpanan";
import EditStatusKredit from "./Component/Pages/Kredit/EditStatusKredit";
import EditStatusPinjaman from "./Component/Pages/Pinjam/EditStatusPinjaman";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  tokenExpires: 0,
  role: localStorage.getItem("role"),
  id: localStorage.getItem("id")
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      localStorage.setItem("id", JSON.stringify(action.payload.id));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires,
        role: action.payload.role,
        id: action.payload.id
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default: return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{ state, dispatch }}>
          <MenuComp />
          {/* {!state.isAuthenticated ? <Redirect to={{ pathname: "/Login" }} /> :  <Redirect to={{ pathname: "/Home" }} />} */}

          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={HomeComp} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/visimisi" component={Visimisi} />
          <Route exact path="/kredit" component={Kredit1} />
          <Route exact path="/kredit2" component={Kredit2} />
          <Route exact path="/masuk" component={Masuk} />
          <Route exact path="/daftar" component={Daftar} />
          <Route exact path="/simpan" component={Simpan} />
          <Route exact path="/pinjam" component={Pinjam1} />
          <Route exact path="/pinjam2" component={Pinjam2} />
          <Route exact path="/pinjam3" component={Pinjam3} />
          <Route exact path="/tabungan" component={Tabungan} />
          <Route exact path="/tampilpinjaman" component={TampilPinjaman} />
          <Route exact path="/tampilkredit" component={TampilKredit} />
          <Route exact path="/toko" component={Produk} />
          <Route exact path="/admin" component={RoleAdmin} />
          <Route exact path="/member" component={RoleMember} />
          <Route exact path="/staff" component={RoleStaff} />
          <Route exact path="/daftaranggota" component={DaftarAnggota} />
          <Route exact path="/daftarpinjaman" component={DaftarPinjaman} />
          <Route exact path="/daftarbarang" component={DaftarBarang} />
          <Route exact path="/daftarsimpanan" component={DaftarSimpanan} />
          <Route exact path="/daftarkredit" component={DaftarKredit} />
          <Route exact path="/daftarpenjualan" component={DaftarPenjualan} />
          <Route exact path="/pinjamsementara" component={DaftarPinjamanSementara}/>
          <Route exact path="/kreditsementara" component={DaftarKreditSementara}/>
          <Route exact path="/editanggota/:id" component={EditAnggota} />
          <Route exact path="/editbarang/:id" component={EditBarang} />
          <Route exact path="/editkredit/:id" component={EditKredit} />
          <Route exact path="/editpenjualan/:id" component={EditPenjualan} />
          <Route exact path="/editpinjaman/:id" component={EditPinjaman} />
          <Route exact path="/editsimpanan/:id" component={EditSimpanan} />
          <Route exact path="/tambahanggota" component={TambahAnggota} />
          <Route exact path="/tambahkredit" component={TambahKredit} />
          <Route exact path="/tambahpenjualan" component={TambahPenjualan} />
          <Route exact path="/tambahbarang" component={TambahBarang} />
          <Route exact path="/tambahpinjaman" component={TambahPinjaman} />
          <Route exact path="/tambahsimpanan" component={TambahSimpanan} />
          <Route exact path="/editstatuskredit/:id" component={EditStatusKredit} />
          <Route exact path="/editstatuspinjam/:id" component={EditStatusPinjaman} />
        </AuthContext.Provider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
