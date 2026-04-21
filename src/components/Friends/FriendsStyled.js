import styled from "styled-components";
import { FaUserCheck } from "react-icons/fa";

export const FriendsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FriendCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-height: 50px;
  width: 100%;
  border-bottom: solid 1px white;
  text-align: center;
  padding: 0px 10px;
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
