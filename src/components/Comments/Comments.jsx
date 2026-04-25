import React, { useEffect, useState } from "react";
import {
  CommentContainerStyled,
  CommentContentSyled,
  CommentInputStyled,
  CommentLoadingIconStyled,
  CommentNameStyled,
  CommentSectionStyled,
  CommentSendContainerStyled,
  CommentSendIconStyled,
  DateSpanStyled,
  NameAndCommentContainerStyled,
  NoCommentsMsgStyled,
  ReloadCommentsIconStyled,
} from "./CommentsStyled";
import {
  ActionsContainerStyled,
  CommentButton,
  DateContainerStyled,
  IconStyled,
} from "../Posts/PostsStyled";
import { useDispatch, useSelector } from "react-redux";
import { useGetCommentsQuery } from "../../store/api/apiSlice";
import { FaCommentDots, FaArrowCircleUp } from "react-icons/fa";
import { RL_LoadingIconStyled } from "../RL_Shared/RL_Styled";
import { loadCommentsBatch } from "../../slices/feedSlice";
import { getDate } from "../../helpers/getDateString";
import { FaPenNib } from "react-icons/fa6";

const Comments = ({ postId }) => {
  const comments = useSelector((state) => {
    return state.feed.posts.find((post) => {
      return post.postId === postId;
    }).comments;
  });
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const { data, error, isFetching, isSuccess, isError, refetch } =
    useGetCommentsQuery(postId, {
      skip: !showComments,
    });
  useEffect(() => {
    if (data) dispatch(loadCommentsBatch(data));
  }, [data, isFetching]);
  return (
    <>
      <ActionsContainerStyled>
        <CommentButton
          onClick={() => {
            setShowComments((prev) => {
              return !prev;
            });
          }}
          disabled={isFetching}
        >
          {!showComments && <FaCommentDots></FaCommentDots>}
          {showComments && <FaArrowCircleUp></FaArrowCircleUp>}
          {showComments ? "Cerrar comentarios" : "Ver comentarios"}
        </CommentButton>
      </ActionsContainerStyled>
      {showComments && (
        <CommentSectionStyled>
          {!isFetching &&
            comments?.map((comment) => {
              return (
                <CommentContainerStyled key={comment?.commentId}>
                  <IconStyled>{comment?.username.charAt(0)}</IconStyled>
                  <NameAndCommentContainerStyled>
                    <CommentNameStyled>
                      {comment?.username} |
                      <DateSpanStyled>
                        {getDate(comment?.createdAt).hourDateString}
                      </DateSpanStyled>
                    </CommentNameStyled>
                    <CommentContentSyled>
                      {comment?.content}
                    </CommentContentSyled>
                  </NameAndCommentContainerStyled>
                </CommentContainerStyled>
              );
            })}
          {!isFetching && comments?.length === 0 && (
            <NoCommentsMsgStyled>
              No hay comentarios en este post. Podrias ser el primero...
              <FaPenNib></FaPenNib>
            </NoCommentsMsgStyled>
          )}
          {isFetching && (
            <CommentLoadingIconStyled
              stroke="#98ff98"
              strokeOpacity={0.125}
              speed={0.75}
            ></CommentLoadingIconStyled>
          )}
          <CommentSendContainerStyled>
            <ReloadCommentsIconStyled></ReloadCommentsIconStyled>
            <CommentInputStyled placeholder="Escribe un comentario..."></CommentInputStyled>
            <CommentSendIconStyled></CommentSendIconStyled>
          </CommentSendContainerStyled>
        </CommentSectionStyled>
      )}
    </>
  );
};

export default Comments;
