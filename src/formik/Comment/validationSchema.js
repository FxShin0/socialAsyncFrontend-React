import * as Yup from "yup";

export const validationSchemaComment = Yup.object({
  comment: Yup.string().trim().required("No puedes enviar un comentario vacio"),
});
