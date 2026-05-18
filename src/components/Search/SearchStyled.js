import styled from "styled-components";
import { RL_LoadingIconStyled } from "../RL_Shared/RL_Styled";

export const SearchContainerStyled = styled.div`
  position: relative;
  width: 30%;
  height: 60%;
`;
export const SearchFriendsInputStyled = styled.input`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  border: solid 1px white;
`;

export const SearchResultsContainerStyled = styled.div`
  position: absolute;
  width: 100%;
  display: ${({ shouldShowResults }) => {
    return shouldShowResults ? "flex" : "none";
  }};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  border: solid 1px white;
  border-top: none;
  background-color: #010112;
`;

export const ResultCardStyled = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  border: solid 1px white;
  background-color: #010112;
  padding: 5px 10px;
  &:hover {
    background-color: #07071f;
    cursor: pointer;
  }
`;

export const SearchLoadingIconStyled = styled(RL_LoadingIconStyled)`
  width: 50px;
  height: 50px;
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

export const ResultNameStyled = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  color: white;
  text-align: center;
`;

export const NoResultsMsgStyled = styled.p`
  font-size: 1.2rem;
  font-weight: 200;
  color: white;
  padding: 5px;
`;

export const ErrorMsgStyled = styled(NoResultsMsgStyled)``;
