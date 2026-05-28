import { useEffect, useRef, useState } from "react";
import { useSearchUserQuery } from "../store/api/apiSlice";

const useSearchUsers = ({ enableClickOutside = true } = {}) => {
  const [searchInput, setSearchInput] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldShowResults, setShouldShowResults] = useState(false);

  const searchRef = useRef(null);
  const timerId = useRef(null);

  const { data, error, isFetching, currentData, isError } = useSearchUserQuery(
    searchInput,
    {
      skip: !shouldFetch,
    },
  );

  useEffect(() => {
    setShouldFetch(false);
  }, [data]);

  useEffect(() => {
    if (!enableClickOutside) return;
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    clearTimeout(timerId.current);

    setShouldFetch(false);
    setShouldShowResults(true);
    setSearchInput(value);

    if (value !== "") {
      timerId.current = setTimeout(() => {
        setShouldFetch(true);
      }, 1000);
    } else {
      setShouldShowResults(false);
    }
  };

  const closeSearch = () => {
    setSearchInput("");
    setShouldFetch(false);
    setShouldShowResults(false);
  };

  return {
    searchInput,
    shouldShowResults,
    data,
    error,
    isFetching,
    isError,

    searchRef,
    currentData,

    setShouldShowResults,
    handleInputChange,
    closeSearch,
  };
};

export default useSearchUsers;
