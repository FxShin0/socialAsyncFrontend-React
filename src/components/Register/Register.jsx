import { ErrorMessage, Formik } from "formik";
import React from "react";
import { initialValuesReg } from "../../formik/RegisterForm/initialValues";
import { validationSchemaReg } from "../../formik/RegisterForm/validationSchema";
import {
  ErrorMessageStyled,
  FormStyled,
  InputAndErrorContainerStyled,
  InputStyled,
  LabelStyled,
  RL_ButtonStyled,
  RL_ContainerStyled,
  RL_RedirectSignStyled,
  RL_SignStyled,
} from "../RL_Shared/RL_Styled";
import RL_FieldInput from "../RL_Shared/RL_FieldInput";

const Register = () => {
  return (
    <RL_ContainerStyled>
      <RL_SignStyled>Crea tu cuenta!</RL_SignStyled>
      <Formik
        initialValues={initialValuesReg}
        validationSchema={validationSchemaReg}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        <FormStyled>
          <RL_FieldInput
            name={"name"}
            placeholder={"Ingresa tu nombre"}
            type={"text"}
            displayName="Nombre"
          ></RL_FieldInput>
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
          <RL_ButtonStyled>Registrarse</RL_ButtonStyled>
        </FormStyled>
      </Formik>
      <RL_RedirectSignStyled to={"/login"}>
        Ya tienes una cuenta? Inicia sesión
      </RL_RedirectSignStyled>
    </RL_ContainerStyled>
  );
};

export default Register;
