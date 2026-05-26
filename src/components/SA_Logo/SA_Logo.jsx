import React from "react";
import {
  LogoContainerStyled,
  RedLetterSpanStyled,
  WhiteLetterSpanStyled,
  LogoContainerPhoneStyled,
} from "./SA_LogoStyled";

const SA_Logo = ({ onClick, shouldpoint }) => {
  return (
    <>
      <LogoContainerStyled onClick={onClick} shouldpoint={shouldpoint}>
        <RedLetterSpanStyled>s</RedLetterSpanStyled>
        <WhiteLetterSpanStyled>ocial</WhiteLetterSpanStyled>
        <RedLetterSpanStyled>A</RedLetterSpanStyled>
        <WhiteLetterSpanStyled>sync</WhiteLetterSpanStyled>
      </LogoContainerStyled>
      <LogoContainerPhoneStyled onClick={onClick}>
        <RedLetterSpanStyled>S</RedLetterSpanStyled>
        <WhiteLetterSpanStyled>Async</WhiteLetterSpanStyled>
      </LogoContainerPhoneStyled>
    </>
  );
};

export default SA_Logo;
