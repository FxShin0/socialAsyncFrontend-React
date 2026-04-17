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
  RL_ErrorMsgStyled,
  RL_RedirectSignStyled,
  RL_SignStyled,
  RL_LoadingIconStyled,
} from "../RL_Shared/RL_Styled";
import RL_FieldInput from "../RL_Shared/RL_FieldInput";
import { useRegisterMutation } from "../../store/api/apiSlice";

const Register = () => {
  const [register, { data, isLoading, error }] = useRegisterMutation();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = register({
        nombre: values.name,
        username: values.username,
        contraseña: values.password,
      });
      resetForm();
    } catch (err) {}
  };
  return (
    <RL_ContainerStyled>
      {!isLoading && (
        <>
          <RL_SignStyled>Crea tu cuenta!</RL_SignStyled>
          <Formik
            initialValues={initialValuesReg}
            validationSchema={validationSchemaReg}
            onSubmit={handleSubmit}
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
                type={"password"}
                displayName={"Contraseña"}
              ></RL_FieldInput>
              <RL_ButtonStyled type="submit">Registrarse</RL_ButtonStyled>
            </FormStyled>
          </Formik>
          <RL_RedirectSignStyled to={"/login"}>
            Ya tienes una cuenta? Inicia sesión
          </RL_RedirectSignStyled>
        </>
      )}
      {isLoading && (
        <RL_LoadingIconStyled
          stroke="#98ff98"
          strokeOpacity={0.125}
          speed={0.75}
        ></RL_LoadingIconStyled>
      )}

      {error && <RL_ErrorMsgStyled>error.data.msg</RL_ErrorMsgStyled>}
    </RL_ContainerStyled>
  );
};

export default Register;
