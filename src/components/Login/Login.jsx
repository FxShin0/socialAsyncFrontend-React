import React from "react";
import {
  FormStyled,
  RL_ContainerStyled,
  RL_SignStyled,
  RL_ButtonStyled,
  RL_RedirectSignStyled,
  RL_ErrorMsgStyled,
  RL_LoadingIconStyled,
} from "../RL_Shared/RL_Styled";
import { Formik } from "formik";
import { initialValuesLogin } from "../../formik/Login/initialValues";
import { validationSchemaLogin } from "../../formik/Login/validationSchema";
import RL_FieldInput from "../RL_Shared/RL_FieldInput";
import { useLoginMutation } from "../../store/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await login({
        username: values.username,
        contraseña: values.password,
      }).unwrap();
      dispatch(setUserData(result));
      navigate("/");
    } catch (err) {}
  };
  return (
    <RL_ContainerStyled>
      {!isLoading && (
        <>
          <RL_SignStyled> Inicia Sesión!</RL_SignStyled>
          <Formik
            initialValues={initialValuesLogin}
            validationSchema={validationSchemaLogin}
            onSubmit={handleSubmit}
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
                type={"password"}
                displayName={"Contraseña"}
                autoComplete="new-password"
              ></RL_FieldInput>
              <RL_ButtonStyled type={"submit"} disabled={isLoading}>
                Iniciar Sesión
              </RL_ButtonStyled>
            </FormStyled>
          </Formik>
          <RL_RedirectSignStyled to={"/register"}>
            No tienes una cuenta? Registrate!
          </RL_RedirectSignStyled>
          {error && <RL_ErrorMsgStyled>{error.data.msg}</RL_ErrorMsgStyled>}
        </>
      )}
      {isLoading && (
        <RL_LoadingIconStyled
          stroke="#98ff98"
          strokeOpacity={0.125}
          speed={0.75}
        ></RL_LoadingIconStyled>
      )}
    </RL_ContainerStyled>
  );
};

export default Login;
