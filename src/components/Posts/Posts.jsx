import React, { useEffect } from "react";
import {
  ActionsContainerStyled,
  CommentButton,
  DateContainerStyled,
  EndOfFeedIconStyled,
  EndOfFeedMsg,
  IconAndNameContainerStyled,
  IconStyled,
  NameContainerStyled,
  PostContainerStyled,
  PostsContainerStyled,
  TextContainerStyled,
} from "./PostsStyled";
import { FaCommentDots } from "react-icons/fa";
import Comments from "../Comments/Comments";
import { useGetUserFeedQuery } from "../../store/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadPostBatch } from "../../slices/feedSlice";
import { getDate } from "../../helpers/getDateString";

const Posts = () => {
  const { data, error, isFetching, isSuccess, isError } = useGetUserFeedQuery();
  const dispatch = useDispatch();
  const posts = useSelector((state) => {
    return state.feed.posts;
  });
  useEffect(() => {
    if (data) dispatch(loadPostBatch(data));
  }, [data]);
  return (
    <PostsContainerStyled>
      {posts.map((post) => {
        return (
          <PostContainerStyled>
            <IconAndNameContainerStyled>
              <IconStyled>{post.username.charAt(0)}</IconStyled>
              <NameContainerStyled>{post.username}</NameContainerStyled>
            </IconAndNameContainerStyled>
            <DateContainerStyled>
              {getDate(post.createdAt).hourDateString}
            </DateContainerStyled>
            <TextContainerStyled>{post.content}</TextContainerStyled>
            <ActionsContainerStyled>
              <CommentButton>
                <FaCommentDots></FaCommentDots>Comentar
              </CommentButton>
            </ActionsContainerStyled>
            <Comments></Comments>
          </PostContainerStyled>
        );
      })}

      <>
        <EndOfFeedIconStyled></EndOfFeedIconStyled>
        <EndOfFeedMsg>
          Parece que ya no hay mas contenido que mostrar. Agrega mas amigos para
          ver sus publicaciones!
        </EndOfFeedMsg>
      </>
    </PostsContainerStyled>
  );
};

export default Posts;
