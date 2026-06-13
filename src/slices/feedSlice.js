import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  livePosts: [],
  scrollPx: 0,
  queryPosts: [],
  realNewPostsCounter: 0,
  mostRecentPostTime: new Date().toISOString(),
  userCreatedPostsIds: [],
  hasAttemptedFirstFeedLoad: false,
  feedNeedsRefetch: false,
  processedPostIds: [],
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
      state.hasAttemptedFirstFeedLoad = true;
      console.log("llamado setLivePosts");
      if (action.payload.posts.length === 0) return;
      state.livePosts[action.payload.page - 1] = action.payload.posts;
      console.log(current(state.livePosts));
      if (state.livePosts[0]?.length) {
        const firstRealPost = state.livePosts[0].find(
          (post) => !post.isUserPost,
        );

        if (firstRealPost) {
          state.mostRecentPostTime = firstRealPost.createdAt;
        }
      }
    },
    setScrollPxUI: (state, action) => {
      state.scrollPx = action.payload.scrollPx;
    },
    addNewUserPost: (state, action) => {
      console.log("llamado addNewUserPost");
      console.log(action.payload);
      if (state.livePosts.length == 0) {
        state.livePosts = [[action.payload.newPost]];
      } else {
        state.livePosts = [
          [action.payload.newPost, ...state.livePosts[0]],
          ...state.livePosts.slice(1),
        ];
      }
      state.userCreatedPostsIds = [
        ...state.userCreatedPostsIds,
        action.payload.newPost._id,
      ];
      console.log(state.userCreatedPostsIds);
    },
    setQueryPosts: (state, action) => {
      console.log("llamado setQueryPosts");
      console.log(action.payload);
      state.queryPosts = [
        ...action.payload.queryPosts.filter((post) => {
          return !state.userCreatedPostsIds.includes(post._id);
        }),
        ...state.queryPosts,
      ];
      console.log(state.queryPosts);
      if (state.queryPosts.length != 0) {
        console.log(
          "actualizado fecha mas reciente con data del post",
          state.queryPosts[0],
        );
        state.mostRecentPostTime = state.queryPosts[0].createdAt;
      }
    },
    mergeQueryLivePosts: (state, action) => {
      console.log("hecho merge, actualmente queryPosts", state.queryPosts);
      const existingIds = new Set(
        state.livePosts.flat().map((post) => post._id),
      );
      console.log(existingIds);
      console.log(state.queryPosts);
      if (state.livePosts.length === 0) {
        state.livePosts = [state.queryPosts];
      } else {
        state.livePosts = [
          [
            ...state.queryPosts.filter((post) => {
              return !existingIds.has(post._id);
            }),
            ...state.livePosts[0],
          ],
          ...state.livePosts.slice(1),
        ];
      }
      console.log(state.livePosts);
      state.queryPosts = [];
      console.log("Asi quedo queryPosts", state.queryPosts);
    },
    resetFeed: (state) => {
      console.log("reset feed");
      state.page = 1;
      state.livePosts = [];
      state.scrollPx = 0;
      state.queryPosts = [];
      state.realNewPostsCounter = 0;
      state.mostRecentPostTime = new Date().toISOString();
      state.userCreatedPostsIds = [];
    },
    setFeedNeedsRefetch: (state, action) => {
      console.log(
        "ejecutado setFeedNeedsRefetch ",
        action.payload.feedNeedsRefetch,
      );
      state.feedNeedsRefetch = action.payload.feedNeedsRefetch;
    },
    setProcessedPostIds: (state, action) => {
      state.processedPostIds = [
        ...state.processedPostIds,
        ...action.payload.queryPosts
          .map((post) => {
            return post._id;
          })
          .filter((id) => {
            return !state.processedPostIds.includes(id);
          }),
      ];
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
  resetFeed,
  setFeedNeedsRefetch,
  setProcessedPostIds,
} = feedSlice.actions;

export default feedSlice.reducer;
