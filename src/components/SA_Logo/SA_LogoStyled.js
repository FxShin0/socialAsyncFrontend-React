import styled from "styled-components";

export const RedLettersSpanStyled = styled.span`
  color: #660103;
  font-size: ${({ fontSize }) => {
    return fontSize ? fontSize : "2rem";
  }};
  text-align: center;
`;
export const WhiteLetterSpanStyled = styled.span`
  color: white;
  font-size: ${({ fontSize }) => {
    return fontSize ? fontSize : "1.7rem";
  }};
  text-align: center;
  font-weight: 200;
`;

export const LogoContainerStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
  font-weight: 800;
`;
