import styled from "styled-components";
import { GiFinishLine } from "react-icons/gi";

export const PostsContainerStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const PostContainerStyled = styled.div`
  width: 100%;
  border: solid 1px white;
  display: flex;
  justify-content: center;
  align-items: left;
  gap: 4px;
  flex-direction: column;
  padding: 10px 20px;
`;

export const IconAndNameContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
`;

export const IconStyled = styled.p`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 20px;
  color: black;
  padding: 10px;
  font-size: 1.5rem;
  text-align: center;
`;

export const NameContainerStyled = styled.p`
  color: white;
  opacity: 60%;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const DateContainerStyled = styled.p`
  color: white;
  opacity: 40%;
  font-size: 1.2rem;
`;

export const TextContainerStyled = styled.p`
  color: white;
  font-size: 1.8rem;
`;

export const ActionsContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentButton = styled.button`
  color: white;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  width: 100%;
  background-color: transparent;
  border: solid 1px white;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;

export const EndOfFeedIconStyled = styled(GiFinishLine)`
  color: white;
  font-size: 3rem;
`;

export const EndOfFeedMsg = styled.p`
  color: white;
  font-size: 1.3rem;
`;
