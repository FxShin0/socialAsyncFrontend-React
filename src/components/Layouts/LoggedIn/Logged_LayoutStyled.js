import styled from "styled-components";
import { RL_NavbarStyled } from "../RegisterLogin/RL_LayoutStyled";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export const LoggedNavbarStyled = styled(RL_NavbarStyled)`
  @media (max-width: 887px) {
    justify-content: center;
    align-items: center;
  }
`;

export const LoggedNavbarPhoneStyled = styled.nav`
  display: flex;
  background-color: #00010d;
  height: 4dvh;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;
  position: fixed;
  z-index: 4;
  bottom: 0px;
  padding: 20px 0px;
  border-top: solid 1px white;
  @media (min-width: 887px) {
    display: none;
  }
`;

export const NavProfileAndLogoutContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  @media (max-width: 887px) {
    display: none;
  }
`;

export const NavButtonNameStyled = styled.p`
  font-size: 1rem;
  font-weight: 200;
  color: white;
  user-select: none;
`;

export const NavUserIconStyled = styled(FaUserCircle)`
  color: white;
  font-size: 1.3rem;
  @media (max-width: 887px) {
    font-size: 2.2rem;
    transition:
      transform 0.12s ease,
      background-color 0.12s ease;

    &:active {
      transform: scale(0.92);
      background-color: rgba(255, 255, 255, 0.12);
    }
    -webkit-tap-highlight-color: transparent;
  }
`;

export const NavLogoutIconStyled = styled(TbLogout2)`
  color: white;
  font-size: 1.3rem;
  @media (max-width: 887px) {
    font-size: 2.2rem;
    transition:
      transform 0.12s ease,
      background-color 0.12s ease;

    &:active {
      transform: scale(0.92);
      background-color: rgba(255, 255, 255, 0.12);
    }
    -webkit-tap-highlight-color: transparent;
  }
`;

export const NavFriendIconWrapper = styled.div`
  position: relative;
  transition:
    transform 0.12s ease,
    background-color 0.12s ease;

  &:active {
    transform: scale(0.92);
    background-color: rgba(255, 255, 255, 0.12);
  }
  -webkit-tap-highlight-color: transparent;
`;
export const NavFriendIconStyled = styled(FaUserFriends)`
  color: white;
  font-size: 2.2rem;
`;

export const NavHomeIconStyled = styled(FaHome)`
  color: white;
  font-size: 1.3rem;
  @media (max-width: 887px) {
    font-size: 2.2rem;
    transition:
      transform 0.12s ease,
      background-color 0.12s ease;

    &:active {
      transform: scale(0.92);
      background-color: rgba(255, 255, 255, 0.12);
    }
    -webkit-tap-highlight-color: transparent;
  }
`;

export const SearchIconStyled = styled(FaSearch)`
  color: white;
  font-size: 2.2rem;
  transition:
    transform 0.12s ease,
    background-color 0.12s ease;

  &:active {
    transform: scale(0.92);
    background-color: rgba(255, 255, 255, 0.12);
  }
  -webkit-tap-highlight-color: transparent;
`;

export const NavButtonContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: solid 1px white;
  border-radius: 10px;
  padding: 3px 10px;
  cursor: pointer;
  &:hover {
    background-color: white;
    border: solid 1px black;
    * {
      color: black;
    }
  }
`;

export const LogoutTextStyled = styled.p`
  color: white;
  font-size: 1.3rem;
  user-select: none;
`;

export const LogoutIconStyled = styled(TbLogout2)`
  color: white;
  font-size: 1.3rem;
`;

export const LayoutContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 93dvh;
  width: 100%;
  margin-top: 7dvh;
  z-index: 0;
  @media (max-width: 900px) {
    margin-top: 5dvh;
    height: 95dvh;
  }
`;

export const MainContainerStyled = styled.div`
  width: 70%;
  height: 93dvh;
  border: solid 3px white;
  overflow-y: auto;
  max-width: 1600px;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;

  /* Chrome / Edge / Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(255, 255, 255);
  }
  @media (max-width: 1450px) {
    width: 60%;
  }
  @media (max-width: 900px) {
    height: 95dvh;
  }
  @media (max-width: 887px) {
    width: 90%;
    border: solid 1px white;
    height: 91dvh;
    padding-bottom: 17px;
  }
`;
export const FriendSectionStyled = styled.div`
  width: 15%;
  border: solid 3px white;
  height: 93dvh;
  overflow-y: auto;
  max-width: 600px;

  scrollbar-width: thin;
  scrollbar-color: rgb(255, 255, 255) transparent;

  @media (max-width: 1450px) {
    width: 20%;
  }
  @media (max-width: 900px) {
    height: 95dvh;
  }
`;
