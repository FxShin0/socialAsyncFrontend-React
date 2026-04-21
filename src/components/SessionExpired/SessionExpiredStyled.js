import styled from "styled-components";
import { LuClockAlert } from "react-icons/lu";

export const ExpiredContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 250px;
  height: 300px;
  padding: 10px 20px;
  text-align: center;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.94);
`;

export const ExpiredIconStyled = styled(LuClockAlert)`
  font-size: 4rem;
  color: white;
`;

export const ExpiredMessageStyled = styled.p`
  font-size: 1.1rem;
  color: white;
`;

export const ExpiredButtonStyled = styled.button`
  background: white;
  color: #0f172a;
  border: none;
  padding: 12px 22px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 10px 22px rgba(0, 0, 0, 0.35);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }
`;
