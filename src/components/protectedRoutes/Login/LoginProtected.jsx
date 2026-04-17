import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoginProtected = ({ children, redirectTo }) => {
  const tokenRdx = useSelector((state) => {
    return state.auth.token;
  });
  const tokenLocal = localStorage.getItem("token");

  return tokenRdx || tokenLocal ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={redirectTo}></Navigate>
  );
};

export default LoginProtected;
