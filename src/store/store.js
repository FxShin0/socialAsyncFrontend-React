import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../slices/authSlice";
import friendReducer from "../slices/friendSlice";
import feedReducer from "../slices/feedSlice";

const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  friend: friendReducer,
  feed: feedReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "app/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
