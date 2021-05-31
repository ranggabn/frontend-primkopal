import React, { useContext, useState } from "react";
import { AuthContext } from "../../../App";
import MenuAdmin from "./MenuAdmin";
import MenuMember from "./MenuMember";
import MenuPublik from "./MenuPublik";
import MenuStaff from "./MenuStaff";

export default function MenuComp() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <MenuPublik />;
  }
  if (state.role === 1) {
    return <MenuAdmin />;
  }else if(state.role === 2){
    return <MenuStaff />
  }
  return <MenuMember />;
}
