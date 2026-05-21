import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDelayedLoading } from "../../customHooks/useDelayedLoading";
import { initialValuesPost } from "../../formik/Post/initialValues";
import { validationSchemaPost } from "../../formik/Post/validationSchema";
import { autoExpandTextArea } from "../../helpers/autoExpandTextArea";
import { getDate } from "../../helpers/getDateString";
import {
  apiSlice,
  useCreatePostMutation,
  useGetUserFeedQuery,
  useGetUserPostsQuery,
} from "../../store/api/apiSlice";
import Comments from "../Comments/Comments";
import {
  ColdStartMsgStyled,
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
  PostsErrorMsgStyled,
  SendPostBtnStyled,
  SendPostFormContainerStyled,
  TextContainerStyled,
} from "./PostSectionStyled";
import { logout, setSessionExpired } from "../../slices/authSlice";

const PostSection = ({
  mode,
  canPost,
  endOfPostsMsg,
  postsAuthor,
  errorMsgHeader,
}) => {
  const [newPostId, setNewPostId] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const feedQuery = useGetUserFeedQuery(page, { skip: mode !== "feed" });
  const userPostsQuery = useGetUserPostsQuery(
    { user: postsAuthor, page },
    { skip: mode === "feed" },
  );
  const { data, error, isFetching, isLoading, isSuccess, isError } =
    mode === "feed" ? feedQuery : userPostsQuery;
  const showColdStart = useDelayedLoading(isFetching, 3000);
  const [
    createPost,
    { data: dataNewPost, isLoading: isLoadingNewPost, error: errorNewPost },
  ] = useCreatePostMutation();
  useEffect(() => {
    setAllPosts([]);
    setPage(1);
  }, [postsAuthor]);
  useEffect(() => {
    if (error?.data?.msg == "Token no valido") {
      dispatch(setSessionExpired(true));
      dispatch(apiSlice.util.resetApiState());
      dispatch(logout());
    }
  }, [error]);

  useEffect(() => {
    if (!data?.posts) return;

    setAllPosts((prev) => {
      if (page === 1) {
        return data.posts;
      }

      return [...prev, ...data.posts];
    });
  }, [data, page]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await createPost({
        token,
        content: values.post,
      }).unwrap();
      setAllPosts((prev) => [result.post, ...prev]);
      setNewPostId(result.post._id);
      resetForm();
    } catch (err) {}
  };

  return (
    <>
      {canPost && (
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
      )}
      <PostsContainerStyled>
        {!isError &&
          !isLoading &&
          allPosts?.map((post) => {
            return (
              <PostContainerStyled
                key={post?._id}
                isNew={post?._id === newPostId}
              >
                <IconAndNameContainerStyled>
                  <IconStyled>{post?.username?.charAt(0)}</IconStyled>
                  <NameContainerStyled>{post?.username}</NameContainerStyled>
                </IconAndNameContainerStyled>
                <DateContainerStyled>
                  {getDate(post?.createdAt).hourDateString}
                </DateContainerStyled>
                <TextContainerStyled>{post?.content}</TextContainerStyled>
                <Comments postId={post?._id}></Comments>
              </PostContainerStyled>
            );
          })}
        {isLoading && page === 1 && (
          <FeedLoadingIcon
            stroke="#98ff98"
            strokeOpacity={0.125}
            speed={0.75}
          ></FeedLoadingIcon>
        )}
        {showColdStart && (
          <ColdStartMsgStyled>
            El backend está despertando ☕. La primera solicitud puede tardar
            hasta ~50 segundos...
          </ColdStartMsgStyled>
        )}
        {isError && (
          <PostsErrorMsgStyled>
            {error.data.codErr === 115
              ? `${"🔒 No tienes permisos para ver estos posts. 🔒"}`
              : `${errorMsgHeader + error.data.msg}`}
          </PostsErrorMsgStyled>
        )}
        {!isFetching && isSuccess && data?.posts?.length != 15 && (
          <>
            <EndOfFeedIconStyled></EndOfFeedIconStyled>
            <EndOfFeedMsg>{endOfPostsMsg}</EndOfFeedMsg>
          </>
        )}
      </PostsContainerStyled>
    </>
  );
};

export default PostSection;
