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
  userPosts: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPageUI: (state, action) => {
      state.page = action.payload.page;
    },
    setLivePosts: (state, action) => {
      state.hasAttemptedFirstFeedLoad = true;
      if (action.payload.posts.length === 0) return;
      state.livePosts[action.payload.page - 1] = action.payload.posts;
      if (action.payload.page === 1) {
        state.livePosts[0] = [...state.livePosts[0], ...state.userPosts].sort(
          (postA, postB) =>
            new Date(postB.createdAt) - new Date(postA.createdAt),
        );
      }
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
      state.userPosts.push(action.payload.newPost);
    },
    setQueryPosts: (state, action) => {
      state.queryPosts = [
        ...action.payload.queryPosts.filter((post) => {
          return !state.userCreatedPostsIds.includes(post._id);
        }),
        ...state.queryPosts,
      ];
      if (state.queryPosts.length != 0) {
        state.mostRecentPostTime = state.queryPosts[0].createdAt;
      }
    },
    mergeQueryLivePosts: (state, action) => {
      const existingIds = new Set(
        state.livePosts.flat().map((post) => post._id),
      );
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
      state.queryPosts = [];
    },
    resetFeed: (state) => {
      state.page = 1;
      state.livePosts = [];
      state.scrollPx = 0;
      state.queryPosts = [];
      state.realNewPostsCounter = 0;
      state.mostRecentPostTime = new Date().toISOString();
      state.userCreatedPostsIds = [];
    },
    setFeedNeedsRefetch: (state, action) => {
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
    deletePostFromLive: (state, action) => {
      state.livePosts = state.livePosts.map((page) => {
        return page.filter((post) => {
          return post._id !== action.payload.postId;
        });
      });
      state.userPosts = state.userPosts.filter((post) => {
        return post._id !== action.payload.postId;
      });
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
  deletePostFromLive,
} = feedSlice.actions;

export default feedSlice.reducer;
