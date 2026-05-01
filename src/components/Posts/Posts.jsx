import React, { useEffect, useRef, useState } from "react";
import {
  ActionsContainerStyled,
  CommentButton,
  CreatePostContainerStyled,
  CreatePostFormStyled,
  DateContainerStyled,
  EndOfFeedIconStyled,
  EndOfFeedMsg,
  FeedLoadingIcon,
  IconAndNameContainerStyled,
  IconStyled,
  NameContainerStyled,
  PostContainerStyled,
  PostErrorMessageStyled,
  PostInputStyled,
  PostLoadingIconStyled,
  PostsContainerStyled,
  SendPostBtnStyled,
  SendPostFormContainerStyled,
  TextContainerStyled,
} from "./PostsStyled";
import { FaCommentDots } from "react-icons/fa";
import Comments from "../Comments/Comments";
import {
  useCreatePostMutation,
  useGetUserFeedQuery,
} from "../../store/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, loadPostBatch } from "../../slices/feedSlice";
import { getDate } from "../../helpers/getDateString";
import { ErrorMessageStyled } from "../RL_Shared/RL_Styled";
import { ErrorMessage, Field, Formik, validateYupSchema } from "formik";
import SA_Logo from "../SA_Logo/SA_Logo";
import { autoExpandTextArea } from "../../helpers/autoExpandTextArea";
import { initialValuesPost } from "../../formik/Post/initialValues";
import { validationSchemaPost } from "../../formik/Post/validationSchema";

const Posts = () => {
  const { data, error, isFetching, isSuccess, isError } = useGetUserFeedQuery();
  const [
    createPost,
    { data: dataNewPost, isLoading: isLoadingNewPost, error: errorNewPost },
  ] = useCreatePostMutation();
  const [newPostId, setNewPostId] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => {
    return state.feed.posts;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {
    if (data) dispatch(loadPostBatch(data));
  }, [data, isSuccess]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await createPost({
        token,
        content: values.post,
      }).unwrap();
      dispatch(addNewPost(result));
      setNewPostId(result.post._id);
      resetForm();
    } catch (err) {}
  };

  return (
    <>
      <CreatePostContainerStyled>
        <Formik
          initialValues={initialValuesPost}
          validationSchema={validationSchemaPost}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          <CreatePostFormStyled>
            <Field
              onInput={autoExpandTextArea}
              placeholder="Escribe un nuevo post..."
              type="text"
              name="post"
              as={PostInputStyled}
            ></Field>
            <SendPostFormContainerStyled>
              <ErrorMessage
                name="post"
                component={PostErrorMessageStyled}
              ></ErrorMessage>
              {isLoadingNewPost && (
                <PostLoadingIconStyled
                  stroke="#98ff98"
                  strokeOpacity={0.125}
                  speed={0.75}
                ></PostLoadingIconStyled>
              )}
              {errorNewPost && (
                <PostErrorMessageStyled>
                  {errorNewPost.msg}
                </PostErrorMessageStyled>
              )}
              <SendPostBtnStyled type="submit">Postear</SendPostBtnStyled>
            </SendPostFormContainerStyled>
          </CreatePostFormStyled>
        </Formik>
      </CreatePostContainerStyled>
      <PostsContainerStyled>
        {!isError &&
          posts?.map((post) => {
            return (
              <PostContainerStyled
                key={post?.postId}
                isNew={post?.postId === newPostId}
              >
                <IconAndNameContainerStyled>
                  <IconStyled>{post?.username?.charAt(0)}</IconStyled>
                  <NameContainerStyled>{post?.username}</NameContainerStyled>
                </IconAndNameContainerStyled>
                <DateContainerStyled>
                  {getDate(post?.createdAt).hourDateString}
                </DateContainerStyled>
                <TextContainerStyled>{post?.content}</TextContainerStyled>
                <Comments postId={post?.postId}></Comments>
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
        {isSuccess && data?.posts?.length != 15 && (
          <>
            <EndOfFeedIconStyled></EndOfFeedIconStyled>
            <EndOfFeedMsg>
              Parece que ya no hay mas contenido que mostrar. Agrega mas amigos
              para ver sus publicaciones!
            </EndOfFeedMsg>
          </>
        )}
      </PostsContainerStyled>
    </>
  );
};

export default Posts;
