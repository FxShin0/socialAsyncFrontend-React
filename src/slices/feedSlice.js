import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  livePosts: [],
  scrollPx: 0,
  queryPosts: [],
  realNewPostsCounter: 0,
  mostRecentPostTime: null,
  userCreatedPostsIds: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPageUI: (state, action) => {
      console.log(action);
      state.page = action.payload.page;
    },
    setLivePosts: (state, action) => {
      console.log("llamado setLivePosts");
      if (action.payload.posts.length === 0) return;
      state.livePosts[state.page - 1] = action.payload.posts;
      console.log(current(state.livePosts));
      if (state.livePosts.length != 0 && !state.mostRecentPostTime) {
        state.mostRecentPostTime = state.livePosts[0].find((post) => {
          return !post.isUserPost;
        }).createdAt;
      }
    },
    setScrollPxUI: (state, action) => {
      state.scrollPx = action.payload.scrollPx;
    },
    addNewUserPost: (state, action) => {
      console.log("llamado addNewUserPost");
      console.log(action.payload);
      state.livePosts = [
        [action.payload.newPost, ...state.livePosts[0]],
        ...state.livePosts.slice(1),
      ];
      state.userCreatedPostsIds = [
        ...state.userCreatedPostsIds,
        action.payload.newPost._id,
      ];
      console.log(state.userCreatedPostsIds);
    },
    setQueryPosts: (state, action) => {
      console.log("llamado setQueryPosts");
      console.log(action.payload);
      const existingPosts = new Set(
        state.queryPosts.map((post) => {
          return post._id;
        }),
      );
      state.queryPosts = [
        ...action.payload.queryPosts.filter((post) => {
          return (
            !existingPosts.has(post._id) &&
            !state.userCreatedPostsIds.includes(post._id)
          );
        }),
        ...state.queryPosts,
      ];
      console.log(state.queryPosts);
      if (state.queryPosts.length != 0) {
        state.mostRecentPostTime = state.queryPosts[0].createdAt;
      }
    },
    mergeQueryLivePosts: (state, action) => {
      state.livePosts = [
        [...state.queryPosts, ...(state.livePosts[0] ?? [])],
        ...state.livePosts.slice(1),
      ];
      console.log(state.livePosts);
      state.queryPosts = [];
    },
  },
});

export const {
  setPageUI,
  setLivePosts,
  setScrollPxUI,
  addNewUserPost,
  setQueryPosts,
  mergeQueryLivePosts,
} = feedSlice.actions;

export default feedSlice.reducer;
