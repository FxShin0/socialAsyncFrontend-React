import styled, { keyframes, css } from "styled-components";
import { IoSend } from "react-icons/io5";
import { IoReload } from "react-icons/io5";
import { RL_LoadingIconStyled } from "../RL_Shared/RL_Styled";
import { ErrorMessage, Field, Form } from "formik";

export const CommentSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 10px;
  gap: 5px;
`;

export const CommentContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 10px;
  width: 100%;
  background-color: #0c0b12;
  padding: 10px 20px;
  border-radius: 20px;
  flex-shrink: 0;
  ${({ isNew }) =>
    isNew &&
    css`
      animation: ${glow} 1.2s ease;
    `}
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
  word-break: break-word;
  overflow-wrap: break-word;
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

export const NoCommentsMsgStyled = styled.p`
  font-size: 1.2rem;
  color: #ffffffb3;
`;

export const CommentLoadingIconStyled = styled(RL_LoadingIconStyled)`
  width: 100px;
  height: 100px;
`;

export const CommentAndSendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const CommentFormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const SendCommentButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 0px rgba(255,255,255,0);
  }
  50% {
    box-shadow: 0 0 12px rgba(255,255,255,0.8);
  }
  100% {
    box-shadow: 0 0 0px rgba(255,255,255,0);
  }
`;

export const BottomRef = styled.div`
  scroll-margin-top: 500px;
`;
