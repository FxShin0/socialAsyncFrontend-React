import styled from "styled-components";

export const SearchContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;

export const SearchInputStyled = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
`;

export const SearchResultsContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
