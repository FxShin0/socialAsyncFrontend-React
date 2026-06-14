import { styled, keyframes } from "styled-components";
import { FaUserCheck } from "react-icons/fa";
import LoadingIcons from "react-loading-icons";

export const glow = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-6px);
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    text-shadow: none;
  }
`;

export const ViewSelectorStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
`;

export const GeneralContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const PendingCounterStyled = styled.p`
  background-color: red;
  color: white;
  border-radius: 100%;
  padding: 5px;
  position: absolute;
  top: -10px;
  right: -9px;
  z-index: 10;
  user-select: none;
`;

export const ActionsContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export const ViewTitleAndStatusContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border-bottom: solid 1px white;
  width: 100%;
`;

export const ActionFriendBtnStyled = styled.button`
  background-color: transparent;
  color: ${({ remove }) => {
    return remove ? "#ba0205" : "white";
  }};
  font-size: ${({ isDesktop }) => {
    return isDesktop ? "0.8rem" : "1.3rem";
  }};
  font-weight: 200;
  border: 1px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
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

export const ViewBtnStyled = styled.button`
  border: 1px solid ${({ $isActive }) => ($isActive ? "#00158a" : "#3a3d55")};

  background-color: ${({ $isActive }) => ($isActive ? "#00158a" : "#121424")};

  color: white;

  padding: 8px 14px;
  border-radius: 12px;

  font-size: 0.9rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
  position: relative;
`;

export const FriendsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  overflow-y: auto;
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

export const FriendsTitleStyled = styled.p`
  font-size: 1.4rem;
  color: white;
  font-weight: 100;
  width: 100%;
  text-align: center;
  padding-bottom: 5px;
`;

export const FriendCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  width: 100%;
  gap: 10px;
  border-radius: 10px;
  max-width: 100%;
  position: relative;
  z-index: 0;
  text-align: center;
  padding: 5px 10px;
  background-color: #08081c;
  &:hover {
    background-color: #101035;
    cursor: pointer;
  }
`;

export const NewFriendBanner = styled.p`
  background-color: red;
  color: white;
  border-radius: 10px;
  @media (max-width: 887px) {
    padding: 0px 45px;
  }
  font-size: 1rem;
`;

export const FriendIconStyled = styled(FaUserCheck)`
  font-size: 40px;
  color: white;
`;

export const UsernameAndNameContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UsernameStyled = styled.p`
  font-size: 1.2rem;
  color: white;
  font-weight: 400;
`;

export const NameStyled = styled.p`
  font-size: 0.8rem;
  color: white;
  font-weight: 200;
  opacity: 0.7;
`;

export const NoFriendsMessage = styled.p`
  font-size: 1rem;
  color: white;
  text-align: center;
`;

export const LoadingIconStyled = styled(LoadingIcons.Puff)`
  align-self: center;
  justify-self: center;
  height: ${({ isDesktop }) => {
    return isDesktop ? "35%" : "10%";
  }};
  width: ${({ isDesktop }) => {
    return isDesktop ? "35%" : "10%";
  }};
`;

export const NewFriendMessage = styled(NoFriendsMessage)`
  animation: ${glow} 1.2s ease;
  padding: 5px 10px;
`;
