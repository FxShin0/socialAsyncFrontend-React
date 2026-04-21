import React, { useEffect } from "react";
import { useUserIsLogged } from "../../../customHooks/userIsLogged";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnloggedProtected = ({ redirectTo }) => {
  const userIsLogged = useUserIsLogged();
  const expiredSession = useSelector((state) => {
    return state.auth.isSessionExpired;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (expiredSession) {
      navigate("/sessionExpired");
    }
  }, [expiredSession]);
  return !userIsLogged || expiredSession ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={redirectTo}></Navigate>
  );
};

export default UnloggedProtected;
