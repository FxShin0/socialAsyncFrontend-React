import React from "react";
import {
  RL_FooterStyled,
  RL_ContainerStyled,
  RL_FooterTextContainer,
  RL_NavbarStyled,
} from "./RL_LayoutStyled";
import { Outlet } from "react-router-dom";
import SA_Logo from "../../SA_Logo/SA_Logo";

const RL_Layout = () => {
  return (
    <>
      <RL_NavbarStyled>
        <SA_Logo></SA_Logo>
      </RL_NavbarStyled>
      <RL_ContainerStyled>
        <Outlet></Outlet>
      </RL_ContainerStyled>
      <RL_FooterStyled>
        <RL_FooterTextContainer>
          socialAsync - Hecho con 🤬
        </RL_FooterTextContainer>
      </RL_FooterStyled>
    </>
  );
};

export default RL_Layout;
