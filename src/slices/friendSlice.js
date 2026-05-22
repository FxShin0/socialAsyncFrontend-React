import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFriendshipStatus: null,
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriendshipStatus: (state, action) => {
      console.log(action);
      state.currentFriendshipStatus = action.payload.currentStatus;
    },
  },
});

export const { setFriendshipStatus } = friendSlice.actions;

export default friendSlice.reducer;
