import * as Yup from "yup";

export const validationSchemaLogin = Yup.object({
  username: Yup.string()
    .trim()
    .max(20, "El nombre de usuario debe tener como maximo 20 caracteres")
    .required("Campo requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener como minimo 8 caracteres")
    .required("Campo requerido"),
});
