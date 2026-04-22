import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { IoReload } from "react-icons/io5";

export const CommentSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  margin-top: 10px;
`;

export const CommentContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 4px;
  background-color: #0c0b12;
  padding: 10px 20px;
  border-radius: 20px;
`;

export const NameAndCommentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 5px;
`;

export const DateSpanStyled = styled.span`
  color: white;
  opacity: 40%;
  font-size: 1.4rem;
`;
export const CommentNameStyled = styled.p`
  color: white;
  opacity: 90%;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const CommentContentSyled = styled.p`
  color: white;
  font-size: 1.1rem;
  font-weight: 300;
`;

export const ReloadCommentsIconStyled = styled(IoReload)`
  font-size: 2rem;
  color: white;
  text-align: center;
  &:hover {
    color: #8a8a8a;
    cursor: pointer;
  }
`;

export const CommentSendIconStyled = styled(IoSend)`
  font-size: 2rem;
  color: white;
  text-align: center;
  &:hover {
    color: #8a8a8a;
    cursor: pointer;
  }
`;

export const CommentSendContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

export const CommentInputStyled = styled.input`
  width: 100%;
  padding: 10px 20px;
  border: solid 1px black;
  border-radius: 20px;
`;
