import styled from "styled-components";

export const RL_NavbarStyled = styled.nav`
  height: 7vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: #00010d;
  z-index: 999;
  border-bottom: solid 3px white;
  padding: 0px 20px;
  position: fixed;
  top: 0px;
  @media (max-width: 900px) {
    height: 5vh;
  }
`;

export const RL_ContainerStyled = styled.div`
  margin-top: 7vh;
  height: 88vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RL_FooterStyled = styled.footer`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  border-top: solid 2px white;
`;

export const RL_FooterTextContainer = styled.span`
  color: white;
  font-size: 1rem;
  text-align: center;
`;
