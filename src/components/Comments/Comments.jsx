import React, { useEffect, useRef, useState } from "react";
import {
  BottomRef,
  CommentAndSendContainer,
  CommentContainerStyled,
  CommentContentSyled,
  CommentFormStyled,
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
  SendCommentButton,
} from "./CommentsStyled";
import {
  ActionsContainerStyled,
  CommentButton,
  DateContainerStyled,
  IconStyled,
} from "../Posts/PostsStyled";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "../../store/api/apiSlice";
import { FaCommentDots, FaArrowCircleUp } from "react-icons/fa";
import {
  ErrorMessageStyled,
  RL_LoadingIconStyled,
} from "../RL_Shared/RL_Styled";
import { addNewComment, loadCommentsBatch } from "../../slices/feedSlice";
import { getDate } from "../../helpers/getDateString";
import { FaPenNib } from "react-icons/fa6";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { initialValuesComment } from "../../formik/Comment/initialValues";
import { validationSchemaComment } from "../../formik/Comment/validationSchema";

const Comments = ({ postId }) => {
  const comments = useSelector((state) => {
    return state.feed.posts.find((post) => {
      return post.postId === postId;
    }).comments;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const bottomRef = useRef(null);
  const handleReload = async () => {
    await refetch();
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    });
  };
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const { data, error, isFetching, isSuccess, isError, refetch } =
    useGetCommentsQuery(postId, {
      skip: !showComments,
    });
  const [
    postComment,
    { data: dataComment, isLoading: isLoadingComment, error: errorComment },
  ] = usePostCommentMutation();
  const [newCommentId, setNewCommentId] = useState(null);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await postComment({
        token,
        content: values.comment,
        postId,
      }).unwrap();
      setNewCommentId(result.comment._id);
      dispatch(addNewComment(result));
      resetForm();
    } catch (err) {}
  };
  useEffect(() => {
    if (data) dispatch(loadCommentsBatch(data));
  }, [data, isFetching]);
  useEffect(() => {
    if (!newCommentId) return;

    const t = setTimeout(() => {
      setNewCommentId(null);
    }, 1500);

    return () => clearTimeout(t);
  }, [newCommentId]);

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
                <CommentContainerStyled
                  key={comment?.commentId}
                  isNew={comment?.commentId === newCommentId}
                >
                  <IconStyled>{comment?.username.charAt(0)}</IconStyled>
                  <NameAndCommentContainerStyled>
                    <CommentNameStyled>
                      {comment?.username} |{" "}
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
          <BottomRef ref={bottomRef} />
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
          {isLoadingComment && (
            <CommentLoadingIconStyled
              stroke="#98ff98"
              strokeOpacity={0.125}
              speed={0.75}
            ></CommentLoadingIconStyled>
          )}
          {errorComment && (
            <ErrorMessageStyled>{errorComment.msg}</ErrorMessageStyled>
          )}
          <CommentSendContainerStyled>
            <Formik
              initialValues={initialValuesComment}
              validationSchema={validationSchemaComment}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              <CommentFormStyled>
                <CommentAndSendContainer>
                  <ReloadCommentsIconStyled
                    onClick={handleReload}
                  ></ReloadCommentsIconStyled>
                  <Field
                    placeholder="Escribe un comentario.."
                    as={CommentInputStyled}
                    type="text"
                    name="comment"
                  ></Field>
                  <SendCommentButton type="submit">
                    <CommentSendIconStyled></CommentSendIconStyled>
                  </SendCommentButton>
                </CommentAndSendContainer>
                <ErrorMessage
                  name="comment"
                  component={ErrorMessageStyled}
                ></ErrorMessage>
              </CommentFormStyled>
            </Formik>
          </CommentSendContainerStyled>
        </CommentSectionStyled>
      )}
    </>
  );
};

export default Comments;
