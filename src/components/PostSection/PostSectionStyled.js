import styled, { css, keyframes } from "styled-components";
import { GiFinishLine } from "react-icons/gi";
import { RL_LoadingIconStyled } from "../RL_Shared/RL_Styled";
import { Form } from "formik";
import { glow } from "../Comments/CommentsStyled";

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
  ${({ isNew }) =>
    isNew &&
    css`
      animation: ${postAppear} 1.2s ease;
    `}
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
  flex-shrink: 0;
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

export const FeedLoadingIcon = styled(RL_LoadingIconStyled)`
  height: 100px;
  width: 100px;
`;

// createPosts

export const CreatePostContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 1px white;
  border-top: none;
  padding: 5px;
`;

export const CreatePostFormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

export const SendPostFormContainerStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  width: 100%;
  align-items: center;
`;

export const PostInputStyled = styled.textarea`
  width: 100%;
  min-height: 60px;
  max-height: 250px;

  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;

  padding: 10px 15px;
  color: white;
  font-size: 1.4rem;

  resize: none; // 🔥 evita que el usuario lo estire manual
  outline: none;
  overflow-y: auto; // aparece scroll si se pasa del max-height

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
`;

export const SendPostBtnStyled = styled.button`
  margin-left: auto;

  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;

  padding: 8px 16px;
  color: white;
  font-size: 1.3rem;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const PostErrorMessageStyled = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  color: red;
`;

export const PostLoadingIconStyled = styled(RL_LoadingIconStyled)`
  width: 60px;
  height: 60px;
`;

const postAppear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
    box-shadow: 0 0 0 rgba(255,255,255,0);
  }

  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 0 12px rgba(255,255,255,0.15);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    box-shadow: 0 0 0 rgba(255,255,255,0);
  }
`;
