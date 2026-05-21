import styled from "styled-components";
import { IoReload } from "react-icons/io5";
import LoadingIcons from "react-loading-icons";

export const FriendSectionContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;

export const ActionFriendBtnStyled = styled.button`
  background-color: transparent;
  color: ${({ remove }) => {
    return remove ? "#ba0205" : "white";
  }};
  font-size: 1.2rem;
  font-weight: 500;
  border: 1px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: white;
    color: #00010f;
    * {
      color: #00010f;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DoubleActionBtnContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const FriendMessageStyled = styled.p`
  font-size: 1.3rem;
  color: white;
  font-weight: 300;
  text-align: center;
`;

export const ReloadFriendshipStatusBtnStyled = styled(IoReload)`
  font-size: 2rem;
  color: white;
  text-align: center;
  &:hover {
    color: #8a8a8a;
    cursor: pointer;
  }
`;

export const FriendshipLoadingIcon = styled(LoadingIcons.Puff)`
  align-self: center;
  justify-self: center;
  width: 75px;
  height: 75px;
`;

export const ActionFriendshipLoadingIcon = styled(LoadingIcons.Puff)`
  align-self: center;
  justify-self: center;
  width: 50px;
  height: 50px;
`;
