import React from "react";
import {
  LogoContainerStyled,
  RedLetterSpanStyled,
  WhiteLetterSpanStyled,
} from "./SA_LogoStyled";

const SA_Logo = ({ shouldpoint }) => {
  return (
    <LogoContainerStyled shouldpoint={shouldpoint}>
      <RedLetterSpanStyled>s</RedLetterSpanStyled>
      <WhiteLetterSpanStyled>ocial</WhiteLetterSpanStyled>
      <RedLetterSpanStyled>A</RedLetterSpanStyled>
      <WhiteLetterSpanStyled>sync</WhiteLetterSpanStyled>
    </LogoContainerStyled>
  );
};

export default SA_Logo;
