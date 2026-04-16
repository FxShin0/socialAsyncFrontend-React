import React from "react";
import { InputAndErrorContainerStyled } from "./RL_Styled";
import { LabelStyled } from "./RL_Styled";
import { ErrorMessage } from "formik";
import { ErrorMessageStyled } from "./RL_Styled";
import { InputStyled } from "./RL_Styled";

const RL_FieldInput = ({ name, placeholder, type, displayName }) => {
  return (
    <InputAndErrorContainerStyled>
      <LabelStyled htmlFor={name}>{displayName}</LabelStyled>
      <InputStyled
        name={name}
        placeholder={placeholder}
        type={type}
      ></InputStyled>
      <ErrorMessage name={name} component={ErrorMessageStyled}></ErrorMessage>
    </InputAndErrorContainerStyled>
  );
};

export default RL_FieldInput;
