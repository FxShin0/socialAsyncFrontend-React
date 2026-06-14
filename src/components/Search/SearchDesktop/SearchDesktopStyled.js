import styled from "styled-components";
import { RL_LoadingIconStyled } from "../../RL_Shared/RL_Styled";

export const SearchContainerStyled = styled.div`
  position: relative;
  width: 30%;
  height: 60%;
  @media (max-width: 887px) {
    display: none;
  }
  z-index: 999;
`;
export const SearchFriendsInputStyled = styled.input`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  border: solid 1px white;
  z-index: 999;
`;

export const SearchResultsContainerStyled = styled.div`
  position: absolute;
  width: 100%;
  display: ${({ $shouldShowResults }) => {
    return $shouldShowResults ? "flex" : "none";
  }};
  z-index: 999;
  justify-content: flex-start;
  flex-direction: column;
  border: solid 1px white;
  border-top: none;
  background-color: #010112;
  max-height: 300px;

  overflow-y: auto;
  top: 100%;
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;

  /* Chrome / Edge / Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(255, 255, 255);
  }
  @media (max-width: 887px) {
    max-height: 700px;
  }
`;

export const ResultCardStyled = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
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

export const UsernameAndNameContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const ResultUsernameStyled = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  color: white;
`;

export const ResultNameStyled = styled.p`
  font-size: 0.8;
  font-weight: 200;
  color: gray;
`;

export const NoResultsMsgStyled = styled.p`
  font-size: 1.2rem;
  font-weight: 200;
  color: white;
  padding: 5px;
  text-align: center;
`;

export const ErrorMsgStyled = styled(NoResultsMsgStyled)``;
