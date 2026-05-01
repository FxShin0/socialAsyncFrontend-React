import * as Yup from "yup";

export const validationSchemaPost = Yup.object({
  post: Yup.string().trim().required("No puedes enviar un post vacio"),
});
