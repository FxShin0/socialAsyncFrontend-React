import React from "react";
import useSearchUsers from "../../../customHooks/useSearchUsers";
import { useNavigate } from "react-router-dom";
import {
  SearchContainerStyled,
  SearchInputStyled,
  SearchResultsContainerStyled,
} from "./SearchMobileStyled";
import {
  SearchLoadingIconStyled,
  ResultCardStyled,
  IconStyled,
  UsernameAndNameContainerStyled,
  ResultUsernameStyled,
  ResultNameStyled,
  NoResultsMsgStyled,
  ErrorMsgStyled,
} from "../SearchDesktop/SearchDesktopStyled";

const SearchMobile = () => {
  const navigate = useNavigate();
  const {
    searchInput,
    shouldShowResults,
    data,
    isFetching,
    isError,
    error,
    currentData,
    searchRef,
    setShouldShowResults,
    handleInputChange,
    closeSearch,
  } = useSearchUsers({ enableClickOutside: false });

  return (
    <SearchContainerStyled>
      <SearchInputStyled
        type="text"
        placeholder="Buscar personas..."
        value={searchInput}
        onFocus={() => {
          setShouldShowResults(true);
        }}
        onChange={handleInputChange}
      ></SearchInputStyled>
      <SearchResultsContainerStyled shouldShowResults={shouldShowResults}>
        {isFetching && (
          <SearchLoadingIconStyled
            stroke="#98ff98"
            strokeOpacity={0.125}
            speed={0.75}
          ></SearchLoadingIconStyled>
        )}
        {!isFetching &&
          data?.searchList?.map((result) => {
            return (
              <ResultCardStyled
                key={result._id}
                onPointerDown={() => {
                  navigate(`/posts/${result.username}`);
                  closeSearch();
                }}
              >
                <IconStyled>{result?.username?.charAt(0)}</IconStyled>{" "}
                <UsernameAndNameContainerStyled>
                  {" "}
                  <ResultUsernameStyled>
                    {" "}
                    {result?.username}{" "}
                  </ResultUsernameStyled>{" "}
                  <ResultNameStyled>{result?.nombre}</ResultNameStyled>{" "}
                </UsernameAndNameContainerStyled>
              </ResultCardStyled>
            );
          })}
        {!data && !isFetching && (
          <NoResultsMsgStyled>
            Busca personas para ver sus perfiles 👀...
          </NoResultsMsgStyled>
        )}
        {(!isFetching && data?.searchList.length) === 0 && (
          <NoResultsMsgStyled>
            {" "}
            No se encuentran usuarios con ese username.{" "}
          </NoResultsMsgStyled>
        )}{" "}
        {isError && <ErrorMsgStyled>{error.data.msg}</ErrorMsgStyled>}
      </SearchResultsContainerStyled>
    </SearchContainerStyled>
  );
};

export default SearchMobile;
