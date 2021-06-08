import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import MenuAdmin from "./MenuAdmin";
import MenuMember from "./MenuMember";
import MenuPublik from "./MenuPublik";
import MenuStaff from "./MenuStaff";

export default function MenuComp() {
  const { state } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = state.user
    if (loggedInUser) {
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
    } 
  }, []);

  if (!state.isAuthenticated) {
    return <MenuPublik />;
  }
  if (user && state.role == 1) {
    return <MenuAdmin />;
  }if (user && state.role == 2) {
    return <MenuStaff />;
  }if (user && state.role == 3) {
    return <MenuMember />;
  }
}
