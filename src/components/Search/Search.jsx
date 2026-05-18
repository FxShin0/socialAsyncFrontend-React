import React, { useEffect, useRef, useState } from "react";
import {
  ErrorMsgStyled,
  IconStyled,
  NoResultsMsgStyled,
  ResultCardStyled,
  ResultNameStyled,
  SearchContainerStyled,
  SearchFriendsInputStyled,
  SearchLoadingIconStyled,
  SearchResultsContainerStyled,
} from "./SearchStyled";
import { useSearchUserQuery } from "../../store/api/apiSlice";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldShowResults, setShouldShowResults] = useState(false);
  const navigate = useNavigate();
  const { data, error, isFetching, isSuccess, isError, refetch } =
    useSearchUserQuery(searchInput, {
      skip: !shouldFetch,
    });
  let timerId = useRef();
  useEffect(() => {
    setShouldFetch(false);
  }, [data]);
  return (
    <SearchContainerStyled>
      <SearchFriendsInputStyled
        placeholder="Buscar personas..."
        type="text"
        value={searchInput}
        onBlur={() => {
          setSearchInput("");
          setShouldFetch(false);
          setShouldShowResults(false);
        }}
        onFocus={() => {
          setShouldShowResults(true);
        }}
        onChange={(e) => {
          clearTimeout(timerId.current);
          setShouldFetch(false);
          setShouldShowResults(true);
          if (e.target.value != "") {
            timerId.current = setTimeout(() => {
              setShouldFetch(true);
            }, 1000);
          } else {
            setShouldShowResults(false);
          }
          setSearchInput(e.target.value);
        }}
      ></SearchFriendsInputStyled>
      <SearchResultsContainerStyled shouldShowResults={shouldShowResults}>
        {isFetching && (
          <SearchLoadingIconStyled
            stroke="#98ff98"
            strokeOpacity={0.125}
            speed={0.75}
          ></SearchLoadingIconStyled>
        )}
        {!isFetching &&
          data?.searchList.length != 0 &&
          data?.searchList?.map((result) => {
            return (
              <ResultCardStyled
                key={result?._id}
                onMouseDown={() => {
                  navigate(`/posts/${result?.username}`);
                }}
              >
                <IconStyled>{result?.username?.charAt(0)}</IconStyled>
                <ResultNameStyled>{result?.username}</ResultNameStyled>
              </ResultCardStyled>
            );
          })}
        {(!isFetching && data?.searchList.length) === 0 && (
          <NoResultsMsgStyled>
            No se encuentran usuarios con ese username.
          </NoResultsMsgStyled>
        )}
        {isError && <ErrorMsgStyled>{error.data.msg}</ErrorMsgStyled>}
      </SearchResultsContainerStyled>
    </SearchContainerStyled>
  );
};

export default Search;
