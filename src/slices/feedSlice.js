/* Post and comment schema
const initialState = {
 posts: [
  {
    postId: null,
    username: null,
    content: null,
    createdAt: null,
    comments: [
      {
        commentId: null,
        username: null,
        content: null,
        createdAt: null,
      },
    ],
    showComments: false;
  },
];
};*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      console.log(action.payload);
      /*se espera recibir un payload de la data recibida luego de hacer el post a la API*/
      const { username, content, _id, createdAt } = action.payload.post;
      state.posts = [
        { postId: _id, username, content, createdAt, comments: [] },
        ...state.posts,
      ];
      console.log(state.posts);
    },
    addNewComment: (state, action) => {
      console.log(action.payload);
      const { username, content, _id, createdAt, postId } =
        action.payload.comment;
      state.posts = state.posts.map((post) => {
        return post.postId === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { commentId: _id, content, createdAt, username },
              ],
            }
          : post;
      });
      console.log(state.comments);
    },
    loadPostBatch: (state, action) => {
      const newPosts = action.payload?.posts;
      if (!newPosts) return;

      const existingIds = new Set(state.posts.map((p) => p.postId));

      const formatted = newPosts
        .filter((post) => !existingIds.has(post._id))
        .map((post) => ({
          postId: post._id,
          username: post.username,
          content: post.content,
          createdAt: post.createdAt,
          comments: [],
        }));

      state.posts.push(...formatted);
    },
    loadCommentsBatch: (state, action) => {
      console.log(action.payload);
      const newComments = action.payload?.comments;
      if (!newComments || newComments.length === 0) return;
      const index = state.posts.findIndex((post) => {
        return post.postId === newComments[0].postId;
      });
      const existingIds = new Set(
        state.posts[index].comments.map((c) => {
          return c.commentId;
        }),
      );

      const formatted = newComments
        .filter((c) => {
          console.log(existingIds.has(c._id));
          return !existingIds.has(c._id);
        })
        .map((c) => {
          return {
            commentId: c._id,
            username: c.username,
            content: c.content,
            createdAt: c.createdAt,
          };
        });
      state.posts[index].comments.push(...formatted);
    },
  },
});

export const { addNewPost, addNewComment, loadPostBatch, loadCommentsBatch } =
  feedSlice.actions;

export default feedSlice.reducer;
