import React, { useEffect, useRef, useState } from "react";
import {
  ErrorMsgStyled,
  IconStyled,
  NoResultsMsgStyled,
  ResultCardStyled,
  ResultNameStyled,
  ResultUsernameStyled,
  SearchContainerStyled,
  SearchFriendsInputStyled,
  SearchLoadingIconStyled,
  SearchResultsContainerStyled,
  UsernameAndNameContainerStyled,
} from "../SearchDesktop/SearchDesktopStyled";
import { useSearchUserQuery } from "../../../store/api/apiSlice";
import { useNavigate } from "react-router-dom";
import useSearchUsers from "../../../customHooks/useSearchUsers";

const SearchDesktop = () => {
  const navigate = useNavigate();

  const {
    searchInput,
    shouldShowResults,
    data,
    isFetching,
    isError,
    error,
    searchRef,
    setShouldShowResults,
    handleInputChange,
    closeSearch,
  } = useSearchUsers();

  return (
    <SearchContainerStyled ref={searchRef}>
      <SearchFriendsInputStyled
        placeholder="Buscar personas..."
        type="text"
        value={searchInput}
        onFocus={() => {
          setShouldShowResults(true);
        }}
        onChange={handleInputChange}
      />

      <SearchResultsContainerStyled $shouldShowResults={shouldShowResults}>
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

export default SearchDesktop;
