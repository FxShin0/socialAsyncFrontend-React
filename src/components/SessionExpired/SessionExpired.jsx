import React from "react";
import {
  ExpiredButtonStyled,
  ExpiredContainerStyled,
  ExpiredIconStyled,
  ExpiredMessageStyled,
} from "./SessionExpiredStyled";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSessionExpired } from "../../slices/authSlice";

const SessionExpired = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <ExpiredContainerStyled>
      <ExpiredIconStyled></ExpiredIconStyled>
      <ExpiredMessageStyled>
        Tu sesión ha expirado! Inicia sesion nuevamente para seguir navegando.
      </ExpiredMessageStyled>
      <ExpiredButtonStyled
        onClick={() => {
          dispatch(setSessionExpired(false));
          navigate("/login");
        }}
      >
        Volver a Iniciar Sesion
      </ExpiredButtonStyled>
    </ExpiredContainerStyled>
  );
};

export default SessionExpired;
