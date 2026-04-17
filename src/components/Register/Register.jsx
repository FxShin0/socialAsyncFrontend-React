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
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../store/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, { data, isLoading, error }] = useRegisterMutation();
  const [
    login,
    { data: dataLogin, isLoading: isLoadingLogin, error: errorLogin },
  ] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await register({
        nombre: values.name,
        username: values.username,
        contraseña: values.password,
      }).unwrap();
      const resultLogin = await login({
        username: values.username,
        contraseña: values.password,
      }).unwrap();
      dispatch(setUserData(resultLogin));
      navigate("/");
      resetForm();
    } catch (err) {}
  };
  return (
    <RL_ContainerStyled>
      {!isLoading && !isLoadingLogin && (
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
      {(isLoading || isLoadingLogin) && (
        <RL_LoadingIconStyled
          stroke="#98ff98"
          strokeOpacity={0.125}
          speed={0.75}
        ></RL_LoadingIconStyled>
      )}

      {error && <RL_ErrorMsgStyled>error.data.msg</RL_ErrorMsgStyled>}
      {errorLogin && (
        <RL_ErrorMsgStyled>
          Tu cuenta se creó de forma exitosa pero no pudimos iniciar sesion
          automticamente, inicia de forma manual porfavor
        </RL_ErrorMsgStyled>
      )}
    </RL_ContainerStyled>
  );
};

export default Register;
