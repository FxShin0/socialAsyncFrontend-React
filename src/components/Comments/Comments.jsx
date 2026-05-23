import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaArrowCircleUp, FaCommentDots } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialValuesComment } from "../../formik/Comment/initialValues";
import { validationSchemaComment } from "../../formik/Comment/validationSchema";
import { getDate } from "../../helpers/getDateString";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "../../store/api/apiSlice";
import {
  ActionsContainerStyled,
  CommentButton,
  IconStyled,
} from "../PostSection/PostSectionStyled";
import { ErrorMessageStyled } from "../RL_Shared/RL_Styled";
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
  SendCommentButton,
} from "./CommentsStyled";
import { motion } from "framer-motion";

const Comments = ({ postId }) => {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const [previousCommentIds, setPreviousCommentIds] = useState(new Set());
  const [pendingCommentId, setPendingCommentId] = useState(null);
  const [newCommentIds, setNewCommentIds] = useState(new Set());
  const [allComments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const { data, error, isFetching, isSuccess, currentData, isError, refetch } =
    useGetCommentsQuery(postId, {
      skip: !showComments,
      pollingInterval: 8000,
    });
  const [
    postComment,
    { data: dataComment, isLoading: isLoadingComment, error: errorComment },
  ] = usePostCommentMutation();
  const shouldShowCommentLoader = isLoadingComment || pendingCommentId;
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await postComment({
        token,
        content: values.comment,
        postId,
      }).unwrap();
      setPendingCommentId(result.comment._id);
      resetForm();
    } catch (err) {}
  };
  useEffect(() => {
    if (!data || !pendingCommentId) return;

    const exists = data.comments.some((comment) => {
      return comment._id === pendingCommentId;
    });

    if (exists) {
      setPendingCommentId(null);
    }
  }, [data, pendingCommentId]);

  useEffect(() => {
    if (!showComments) {
      setNewCommentIds(new Set());
      setPreviousCommentIds(new Set());
    }
  }, [showComments]);
  useEffect(() => {
    if (!data) return;

    if (previousCommentIds.size != 0) {
      setNewCommentIds(
        new Set(
          data?.comments
            ?.map((comment) => {
              return comment._id;
            })
            .filter((id) => {
              return !previousCommentIds?.has(id);
            }),
        ),
      );
    }

    setPreviousCommentIds(
      new Set(
        data?.comments?.map((comment) => {
          return comment._id;
        }),
      ),
    );
  }, [data]);

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
          {currentData &&
            data?.comments?.map((comment) => {
              return (
                <CommentContainerStyled
                  key={comment?._id}
                  isNew={newCommentIds?.has(comment?._id)}
                >
                  <IconStyled
                    onClick={() => {
                      navigate(`/posts/${comment?.username}`);
                    }}
                  >
                    {comment?.username.charAt(0)}
                  </IconStyled>
                  <NameAndCommentContainerStyled>
                    <CommentNameStyled
                      onClick={() => {
                        navigate(`/posts/${comment?.username}`);
                      }}
                    >
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
          {!isFetching && data?.comments?.length === 0 && (
            <NoCommentsMsgStyled>
              No hay comentarios en este post. Podrias ser el primero...
              <FaPenNib></FaPenNib>
            </NoCommentsMsgStyled>
          )}
          {isFetching && !currentData && (
            <CommentLoadingIconStyled
              stroke="#98ff98"
              strokeOpacity={0.125}
              speed={0.75}
            ></CommentLoadingIconStyled>
          )}
          {shouldShowCommentLoader && (
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
