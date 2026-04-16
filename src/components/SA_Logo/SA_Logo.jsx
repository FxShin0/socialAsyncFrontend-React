import React from "react";
import {
  LogoContainerStyled,
  RedLettersSpanStyled,
  WhiteLetterSpanStyled,
} from "./SA_LogoStyled";

const SA_Logo = () => {
  return (
    <LogoContainerStyled>
      <RedLettersSpanStyled>SAS</RedLettersSpanStyled>
      <WhiteLetterSpanStyled>ync</WhiteLetterSpanStyled>
    </LogoContainerStyled>
  );
};

export default SA_Logo;
