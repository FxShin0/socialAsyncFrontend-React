import React from "react";
import { LoggedNavbarStyled } from "./Logged_LayoutStyled";
import SA_Logo from "../../SA_Logo/SA_Logo";
import { Outlet } from "react-router-dom";

const Logged_Layout = () => {
  return (
    <>
      <LoggedNavbarStyled>
        <SA_Logo></SA_Logo>
      </LoggedNavbarStyled>
      <Outlet></Outlet>
    </>
  );
};

export default Logged_Layout;
