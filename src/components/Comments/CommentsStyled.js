import { Form } from "formik";
import { IoReload, IoSend } from "react-icons/io5";
import LoadingIcons from "react-loading-icons";
import styled, { css, keyframes } from "styled-components";

export const glow = keyframes`
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

const successAppear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.4) rotate(-20deg);
  }

  60% {
    opacity: 1;
    transform: scale(1.15) rotate(5deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

export const softBounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
  }

  100% {
    transform: translateY(0) scale(1);
  }`;

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
  position: relative;
  ${({ $isNew }) =>
    $isNew &&
    css`
      animation: ${glow} 1.2s ease;
    `}
`;

export const DeleteCommentIconStyled = styled.span`
  color: white;
  font-size: 1.7rem;
  position: absolute;
  top: 0px;
  right: -2px;
  display: ${({ $hide }) => ($hide ? "none" : "flex")};

  cursor: pointer;
  margin: 6px;
  border-radius: 50%;
  transition:
    transform 0.15s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: #ff6b6b;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const DeleteCommentSuccessIcon = styled.span`
  font-size: 1.2rem;
  position: absolute;
  top: 2px;
  right: 4px;
  animation: ${successAppear} 280ms ease-out;
  transform-origin: center;
`;

export const DeleteLoadingIcon = styled(LoadingIcons.Puff)`
  align-self: center;
  justify-self: center;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const NameAndCommentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 5px;
`;

export const DateSpanStyled = styled.span`
  color: gray;
  font-size: 1.4rem;
`;
export const CommentNameStyled = styled.p`
  color: #e6e6e6;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
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
  animation: ${softBounceIn} 1.2s ease;
`;

export const CommentLoadingIconStyled = styled(LoadingIcons.Puff)`
  align-self: center;
  justify-self: center;
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
  scroll-margin-bottom: 100px;
`;

export const SendCommentButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomRef = styled.div`
  scroll-margin-top: 500px;
`;
