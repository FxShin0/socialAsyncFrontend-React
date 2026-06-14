import { styled, keyframes } from "styled-components";
const newPostsModalAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-25px) scale(0.95);
  }

  70% {
    opacity: 1;
    transform: translateY(4px) scale(1.02);
  }

  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
`;

export const NewPostsModalStyled = styled.p`
  font-size: 1.2rem;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  position: absolute;
  top: 120px;
  background-color: #131354;
  z-index: 999;
  animation: ${newPostsModalAnimation} 0.45s ease-out;
  @media (max-width: 887px) {
    top: 7vh;
  }
`;
