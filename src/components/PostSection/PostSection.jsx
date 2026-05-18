import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { initialValuesPost } from "../../formik/Post/initialValues";
import { validationSchemaPost } from "../../formik/Post/validationSchema";
import { autoExpandTextArea } from "../../helpers/autoExpandTextArea";
import { getDate } from "../../helpers/getDateString";
import {
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
import { useDelayedLoading } from "../../customHooks/useDelayedLoading";

const PostSection = ({
  mode,
  canPost,
  endOfPostsMsg,
  postsAuthor,
  errorMsgHeader,
}) => {
  const [newPostId, setNewPostId] = useState(null);
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const queryFunction =
    mode === "feed" ? useGetUserFeedQuery : useGetUserPostsQuery;
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { data, error, isFetching, isSuccess, isError } = queryFunction({
    user: postsAuthor,
    page,
    token,
  });
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
          !isFetching &&
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
        {isFetching && (
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
              ? `${"Psst 👀... Si quieres ver sus posts agregalo como amigo!"}`
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
