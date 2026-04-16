import * as Yup from "yup";

export const validationSchemaReg = Yup.object({
  name: Yup.string()
    .trim()
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .required("Campo requerido"),
  username: Yup.string()
    .trim()
    .max(20, "El nombre de usuario debe tener como maximo 20 caracteres")
    .required("Campo requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener como minimo 8 caracteres")
    .required("Campo requerido"),
});
