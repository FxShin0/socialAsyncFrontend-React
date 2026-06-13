import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentFriendshipStatus: null,
  newFriends: null,
  oldFriends: null, //o current dependiendo de como lo quieras ver
  variation: 0,
  //pending friends
  oldPendingListLength: null,
  pendingVariation: 0,
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriendshipStatus: (state, action) => {
      state.currentFriendshipStatus = action.payload.currentStatus;
    },
    setNewFriends: (state, action) => {
      //recibe el array actual de amigos y mete solo aquellos que no hayan estado en el viejo, es acumulativo, el viejo se setea primero
      if (state.oldFriends !== null) {
        state.variation =
          action.payload.currentFriends.length - state.oldFriends.length;
        state.newFriends = [
          ...action.payload.currentFriends
            .map((friendship) => {
              return friendship._id;
            })
            .filter((friend) => {
              return !state.oldFriends.includes(friend);
            }),
          ...(state.newFriends ? state.newFriends : []),
        ];
      }
      state.oldFriends = [
        ...action.payload.currentFriends.map((friendship) => {
          return friendship._id;
        }),
      ];
      //quita aquellos que se hayan eliminado y se consideraban nuevos y el usuario nunca vio
      if (state.newFriends) {
        state.newFriends = [
          ...state.newFriends.filter((id) => {
            return state.oldFriends.includes(id);
          }),
        ];
      }
    },
    resetNewFriends: (state) => {
      state.newFriends = [];
    },
    setPendingVariation: (state, action) => {
      if (state.oldPendingListLength != null) {
        state.pendingVariation =
          action.payload.friendRequests.length - state.oldPendingListLength;
      }
      state.oldPendingListLength = action.payload.friendRequests.length;
    },
  },
});

export const {
  setFriendshipStatus,
  setNewFriends,
  resetNewFriends,
  setPendingVariation,
} = friendSlice.actions;

export default friendSlice.reducer;
