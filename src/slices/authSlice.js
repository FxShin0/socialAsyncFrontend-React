import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  isSessionExpired: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token).username;
      //lo siguiente esta mal por riesgos de CSS pero por este proyecto se hará asi
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    setSessionExpired: (state, action) => {
      state.isSessionExpired = action.payload;
      console.log(state.isSessionExpired);
    },
  },
});

export const { logout, setUserData, setSessionExpired } = authSlice.actions;

export default authSlice.reducer;
