import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaArrowCircleUp, FaCommentDots } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa6";
import { useSelector } from "react-redux";
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
  ReloadCommentsIconStyled,
  SendCommentButton,
} from "./CommentsStyled";

const Comments = ({ postId }) => {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const bottomRef = useRef(null);
  const handleReload = async () => {
    try {
      const result = await refetch().unwrap();
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      });
      setAllComments(result.comments);
    } catch (err) {}
  };
  const [allComments, setAllComments] = useState([]);
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
      setAllComments((prev) => {
        return [...prev, result.comment];
      });
      resetForm();
    } catch (err) {}
  };
  useEffect(() => {
    if (!data) return;
    setAllComments((prev) => {
      return [...data.comments];
    });
  }, [data]);

  useEffect(() => {
    if (!newCommentId) return;

    const t = setTimeout(() => {
      setNewCommentId(null);
    }, 1500);

    return () => clearTimeout(t);
  }, [data, newCommentId]);

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
            allComments?.map((comment) => {
              console.log(allComments);
              return (
                <CommentContainerStyled
                  key={comment?._id}
                  isNew={comment?._id === newCommentId}
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
          {!isFetching && data?.comments?.length === 0 && (
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
