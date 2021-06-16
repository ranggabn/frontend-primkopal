import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import MenuAdmin from "./MenuAdmin";
import MenuMember from "./MenuMember";
import MenuPublik from "./MenuPublik";
import MenuStaff from "./MenuStaff";

export default function MenuComp() {
  const { state } = useContext(AuthContext);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const loggedInUser = state.user
    // console.log(loggedInUser);
    if (loggedInUser) {
      setUser(loggedInUser);
    } 
  }, [state.user]);

  if (user && state.role == 1) {
    return <MenuAdmin />;
  }else if (user && state.role == 2) {
    return <MenuStaff />;
  }else if (user && state.role == 3) {
    return <MenuMember />;
  }else {return <MenuPublik/>}
}
