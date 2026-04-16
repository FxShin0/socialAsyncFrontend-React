import { ErrorMessage, Field, Form } from "formik";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const InputStyled = styled(Field)`
  border-radius: 10px;
  padding: 4px 10px;
  width: 200px;
`;

export const ErrorMessageStyled = styled.p`
  color: red;
  font-weight: 300;
  font-size: 0.9rem;
`;

export const InputAndErrorContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: left;
  align-items: left;
  text-align: left;
  flex-wrap: wrap;
  width: 200px;
`;

export const LabelStyled = styled.label`
  color: white;
  font-size: 1rem;
  font-weight: 800;
`;

export const RL_SignStyled = styled.h1`
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  width: 100%;
  text-align: center;
`;

export const RL_ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 10px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 20px;
`;

export const RL_ButtonStyled = styled.button`
  background: white;
  color: #0f172a;
  border: none;
  padding: 6px 11px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
`;

export const RL_RedirectSignStyled = styled(NavLink)`
  color: white;
  font-weight: 400;
  text-align: center;
  width: 80%;
  font-size: 1rem;
  margin-top: 10px;
  align-self: center;
  text-decoration: underline;
`;
