import styled from "styled-components";
import { RL_NavbarStyled } from "../RegisterLogin/RL_LayoutStyled";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

export const LoggedNavbarStyled = styled(RL_NavbarStyled)``;

export const SearchFriendsInputStyled = styled.input`
  width: 30%;
  height: 60%;
  border-radius: 15px;
  padding: 5px 10px;
`;

export const NavProfileAndLogoutContainerSylted = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const NavProfileNameStyled = styled.p`
  font-size: 1.3rem;
  font-weight: 200;
  color: white;
  user-select: none;
`;

export const NavProfileIconStyled = styled(FaUserCircle)`
  color: white;
  font-size: 1.3rem;
`;

export const NavProfileContainerStyled = styled.div`
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
    ${NavProfileNameStyled} {
      color: black;
    }
    ${NavProfileIconStyled} {
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

export const LogoutContainerStyled = styled(NavProfileContainerStyled)`
  &:hover {
    background-color: white;
    color: black;
    ${LogoutTextStyled} {
      color: black;
    }
    ${LogoutIconStyled} {
      color: black;
    }
  }
`;

export const LayoutContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
  height: 93vh;
  width: 100%;
  margin-top: 7vh;
`;

export const MainContainerStyled = styled.div`
  width: 70%;
  min-height: 93vh;
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
`;
export const FriendSectionStyled = styled.div`
  width: 15%;
  border: solid 3px white;
  min-height: 93vh;
  overflow-y: auto;
  max-width: 600px;

  scrollbar-width: thin;
  scrollbar-color: rgb(255, 255, 255) transparent;

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
`;
