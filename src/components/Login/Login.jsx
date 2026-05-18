import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDelayedLoading } from "../../customHooks/useDelayedLoading";
import { initialValuesLogin } from "../../formik/Login/initialValues";
import { validationSchemaLogin } from "../../formik/Login/validationSchema";
import { setUserData } from "../../slices/authSlice";
import { useLoginMutation } from "../../store/api/apiSlice";
import RL_FieldInput from "../RL_Shared/RL_FieldInput";
import {
  FormStyled,
  RL_ButtonStyled,
  RL_ColdStartMsgStyled,
  RL_ContainerStyled,
  RL_ErrorMsgStyled,
  RL_LoadingIconStyled,
  RL_RedirectSignStyled,
  RL_SignStyled,
} from "../RL_Shared/RL_Styled";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const showColdStart = useDelayedLoading(isLoading, 3000);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await login({
        username: values.username,
        contraseña: values.password,
      }).unwrap();
      dispatch(setUserData(result));
      navigate("/feed");
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
      {showColdStart && (
        <RL_ColdStartMsgStyled>
          El backend está despertando ☕. La primera solicitud puede tardar
          hasta ~50 segundos...
        </RL_ColdStartMsgStyled>
      )}
    </RL_ContainerStyled>
  );
};

export default Login;
