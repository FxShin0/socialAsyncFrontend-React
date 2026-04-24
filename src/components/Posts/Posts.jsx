import React, { useEffect } from "react";
import {
  ActionsContainerStyled,
  CommentButton,
  DateContainerStyled,
  EndOfFeedIconStyled,
  EndOfFeedMsg,
  FeedLoadingIcon,
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
import { ErrorMessageStyled } from "../RL_Shared/RL_Styled";

const Posts = () => {
  const { data, error, isFetching, isSuccess, isError } = useGetUserFeedQuery();
  const dispatch = useDispatch();
  const posts = useSelector((state) => {
    return state.feed.posts;
  });
  useEffect(() => {
    if (data) dispatch(loadPostBatch(data));
  }, [data, isSuccess]);
  return (
    <PostsContainerStyled>
      {!isError &&
        posts?.map((post) => {
          return (
            <PostContainerStyled key={post?.postId}>
              <IconAndNameContainerStyled>
                <IconStyled>{post?.username.charAt(0)}</IconStyled>
                <NameContainerStyled>{post?.username}</NameContainerStyled>
              </IconAndNameContainerStyled>
              <DateContainerStyled>
                {getDate(post?.createdAt).hourDateString}
              </DateContainerStyled>
              <TextContainerStyled>{post?.content}</TextContainerStyled>
              <ActionsContainerStyled>
                <CommentButton>
                  <FaCommentDots></FaCommentDots>Comentar
                </CommentButton>
              </ActionsContainerStyled>
              <Comments></Comments>
            </PostContainerStyled>
          );
        })}
      {isFetching && (
        <FeedLoadingIcon
          stroke="#98ff98"
          strokeOpacity={0.125}
          speed={0.75}
        ></FeedLoadingIcon>
      )}
      {isError && (
        <ErrorMessageStyled>
          Ocurrio un error al obtener el feed: {error.msg}
        </ErrorMessageStyled>
      )}
      {isSuccess && data.posts.length != 15 && (
        <>
          <EndOfFeedIconStyled></EndOfFeedIconStyled>
          <EndOfFeedMsg>
            Parece que ya no hay mas contenido que mostrar. Agrega mas amigos
            para ver sus publicaciones!
          </EndOfFeedMsg>
        </>
      )}
    </PostsContainerStyled>
  );
};

export default Posts;
