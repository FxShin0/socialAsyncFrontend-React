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
      getUserFeed: builder.query({
        query: (page) => {
          return page ? `/feed?page=${page}` : "/feed";
        },
      }),
      getComments: builder.query({
        query: (postId) => {
          return `/comment/${postId}`;
        },
      }),
      postComment: builder.mutation({
        query: (commentInfo) => {
          return {
            url: "/comment",
            method: "POST",
            body: commentInfo, //{token, content, postId}
          };
        },
      }),
      createPost: builder.mutation({
        query: (postInfo) => {
          return {
            url: "/post",
            method: "POST",
            body: postInfo, //{token, content}
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetFriendsQuery,
  useGetUserFeedQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
  useCreatePostMutation,
} = apiSlice;
