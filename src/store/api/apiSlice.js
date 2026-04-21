import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://socialasync.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const tokenRdx = getState().auth.token;
      const tokenLocal = JSON.parse(localStorage.getItem("token"));

      const token = tokenRdx || tokenLocal;

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (credentials) => {
          return {
            url: "/login",
            method: "POST",
            body: credentials,
          };
        },
      }),
      register: builder.mutation({
        query: (credentials) => {
          return {
            url: "/register",
            method: "POST",
            body: credentials,
          };
        },
      }),
      getFriends: builder.query({
        query: () => {
          return "/friend/list";
        },
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation, useGetFriendsQuery } =
  apiSlice;
