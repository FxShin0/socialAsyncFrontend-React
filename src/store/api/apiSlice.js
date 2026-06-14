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
        providesTags: ["friendList"],
      }),
      getUserFeed: builder.query({
        query: (page) => {
          return page ? `/feed?page=${page}` : "/feed";
        },
        providesTags: ["realFeed"],
      }),
      getComments: builder.query({
        query: (postId) => {
          return `/comment/${postId}`;
        },
        providesTags: ["comments"],
      }),
      postComment: builder.mutation({
        query: (commentInfo) => {
          return {
            url: "/comment",
            method: "POST",
            body: commentInfo, //{token, content, postId}
          };
        },
        invalidatesTags: ["profileInfo", "comments"],
      }),
      createPost: builder.mutation({
        query: (postInfo) => {
          return {
            url: "/post",
            method: "POST",
            body: postInfo, //{token, content}
          };
        },
        invalidatesTags: ["userPosts", "profileInfo"],
      }),
      getUserPosts: builder.query({
        query: ({ user, page }) => {
          return page ? `/posts/${user}?page=${page}` : `/posts/${user}`;
        },
        providesTags: ["userPosts"],
      }),
      searchUser: builder.query({
        query: (user) => {
          return user ? `/search?username=${user}` : "/search";
        },
      }),
      getProfileInfo: builder.query({
        query: (user) => {
          return `/profileInfo/${user}`;
        },
        providesTags: ["profileInfo"],
      }),
      getFriendRequestStatus: builder.query({
        query: (user) => {
          return `/friend/requestStatus/${user}`;
        },
        providesTags: ["friendStatus"],
      }),
      sendFriendRequest: builder.mutation({
        query: (requestInfo) => {
          return {
            url: "/friend",
            method: "POST",
            body: requestInfo, //{token,username}
          };
        },
        invalidatesTags: ["friendStatus", "userPosts", "friendList"],
      }),
      acceptOrRejectFriendRequest: builder.mutation({
        query: (requestInfo) => {
          return {
            url: "/friend/acceptOrReject",
            method: "POST",
            body: requestInfo, //{token, username, action}
          };
        },
        invalidatesTags: [
          "friendStatus",
          "userPosts",
          "friendList",
          "profileInfo",
          "pending",
        ],
      }),
      deleteFriend: builder.mutation({
        query: (username) => {
          return {
            url: `/friend/${username}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [
          "friendStatus",
          "userPosts",
          "friendList",
          "profileInfo",
        ],
      }),
      getFriendRequests: builder.query({
        query: () => {
          return "/friend";
        },
        providesTags: ["pending"],
      }),
      getNewPosts: builder.query({
        query: (time) => {
          return `https://socialasync.onrender.com/feed/newPosts/${encodeURIComponent(time)}`;
        },
      }),
      deletePost: builder.mutation({
        query: (postId) => {
          return {
            url: `/post/${postId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["profileInfo"],
      }),
      deleteComment: builder.mutation({
        query: (commentId) => {
          return {
            url: `/comment/${commentId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["comments", "profileInfo"],
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
  useGetUserPostsQuery,
  useSearchUserQuery,
  useGetProfileInfoQuery,
  useGetFriendRequestStatusQuery,
  useSendFriendRequestMutation,
  useAcceptOrRejectFriendRequestMutation,
  useDeleteFriendMutation,
  useGetFriendRequestsQuery,
  useGetNewPostsQuery,
  useDeletePostMutation,
  useDeleteCommentMutation,
} = apiSlice;
