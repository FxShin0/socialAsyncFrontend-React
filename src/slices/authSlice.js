import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token).username;
    },
  },
});

export const { logout, setUserData } = authSlice.actions;

export default authSlice.reducer;
