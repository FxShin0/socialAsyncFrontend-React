import React from "react";
import { NotFoundMessageStyled } from "./NotFoundStyled";

const NotFound = () => {
  return (
    <NotFoundMessageStyled>
      No se encontro la ruta especificada o no estas autorizado a acceder :/
    </NotFoundMessageStyled>
  );
};

export default NotFound;
