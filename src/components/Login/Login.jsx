import React from "react";
import {
  FormStyled,
  RL_ContainerStyled,
  RL_SignStyled,
  RL_ButtonStyled,
  RL_RedirectSignStyled,
} from "../RL_Shared/RL_Styled";
import { Formik } from "formik";
import { initialValuesLogin } from "../../formik/Login/initialValues";
import { validationSchemaLogin } from "../../formik/Login/validationSchema";
import RL_FieldInput from "../RL_Shared/RL_FieldInput";

const Login = () => {
  return (
    <RL_ContainerStyled>
      <RL_SignStyled> Inicia Sesión!</RL_SignStyled>
      <Formik
        initialValues={initialValuesLogin}
        validationSchema={validationSchemaLogin}
      >
        <FormStyled>
          <RL_FieldInput
            name={"username"}
            placeholder={"Ingresa tu nombre de usuario"}
            type={"text"}
            displayName={"Username"}
          ></RL_FieldInput>
          <RL_FieldInput
            name={"password"}
            placeholder={"Ingresa tu contraseña"}
            type={"text"}
            displayName={"Contraseña"}
          ></RL_FieldInput>
          <RL_ButtonStyled>Iniciar Sesión</RL_ButtonStyled>
        </FormStyled>
      </Formik>
      <RL_RedirectSignStyled to={"/register"}>
        No tienes una cuenta? Registrate!
      </RL_RedirectSignStyled>
    </RL_ContainerStyled>
  );
};

export default Login;
