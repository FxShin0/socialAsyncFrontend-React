import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../slices/authSlice";

export const useUserIsLogged = () => {
  const dispatch = useDispatch();
  const tokenRdx = useSelector((state) => state.auth.token);
  const tokenLocal = JSON.parse(localStorage.getItem("token"));

  const token = tokenRdx || tokenLocal;

  useEffect(() => {
    if (tokenLocal && !tokenRdx) {
      dispatch(setUserData({ token: tokenLocal }));
    }
  }, [tokenLocal, tokenRdx, dispatch]);

  return !!token;
};
