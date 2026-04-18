import React from "react";
import { useUserIsLogged } from "../../../customHooks/userIsLogged";
import { Navigate, Outlet } from "react-router-dom";

const UnloggedProtected = ({ redirectTo }) => {
  const userIsLogged = useUserIsLogged();
  return !userIsLogged ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={redirectTo}></Navigate>
  );
};

export default UnloggedProtected;
