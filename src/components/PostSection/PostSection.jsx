import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDelayedLoading } from "../../customHooks/useDelayedLoading";
import { initialValuesPost } from "../../formik/Post/initialValues";
import { validationSchemaPost } from "../../formik/Post/validationSchema";
import { autoExpandTextArea } from "../../helpers/autoExpandTextArea";
import { getDate } from "../../helpers/getDateString";
import { logout, setSessionExpired } from "../../slices/authSlice";
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
  NextPageButtonStyled,
  PageWrapperStyled,
} from "./PostSectionStyled";
import { current } from "@reduxjs/toolkit";

const PostSection = ({
  mode,
  canPost,
  endOfPostsMsg,
  postsAuthor,
  errorMsgHeader,
}) => {
  const [newPostId, setNewPostId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const friendshipStatus = useSelector((state) => {
    return state.friend.currentFriendshipStatus;
  });
  const modeRef = useRef(mode);
  const newPageRef = useRef(null);
  const firstPostPageRef = useRef(null);
  const [firstPostId, setFirstPostId] = useState(null);
  const shouldShowPosts =
    mode === "feed" || user === postsAuthor || friendshipStatus;
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const feedQuery = useGetUserFeedQuery(page, { skip: mode !== "feed" });
  const userPostsQuery = useGetUserPostsQuery(
    { user: postsAuthor, page },
    { skip: mode === "feed" },
  );
  const {
    data,
    error,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    currentData,
  } = mode === "feed" ? feedQuery : userPostsQuery;
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
    if (!currentData?.posts) return;

    if (page != 1) setFirstPostId(currentData.posts[0]?._id);

    setAllPosts((prev) => {
      if (page === 1) {
        return [currentData.posts];
      }

      return [...prev, currentData.posts];
    });
  }, [currentData, page]);

  useEffect(() => {
    if (!firstPostPageRef.current) return;

    requestAnimationFrame(() => {
      firstPostPageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [allPosts.length]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await createPost({
        token,
        content: values.post,
      }).unwrap();
      setAllPosts((prev) => {
        let mutablePrev = [...prev];
        mutablePrev[0] = [result.post, ...mutablePrev[0]];
        return mutablePrev;
      });
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
          (currentData || data) &&
          shouldShowPosts &&
          allPosts?.map((pageMap, indexMap) => {
            return (
              <PageWrapperStyled
                shouldGlow={indexMap != 0 && indexMap === page - 1}
                ref={indexMap != 0 && indexMap === page - 1 ? newPageRef : null}
              >
                {pageMap.map((post, index) => {
                  return (
                    <PostContainerStyled
                      key={post?._id}
                      isNew={post?._id === newPostId}
                      ref={firstPostId === post?._id ? firstPostPageRef : null}
                    >
                      <IconAndNameContainerStyled>
                        <IconStyled
                          onClick={() => {
                            navigate(`/posts/${post?.username}`);
                          }}
                        >
                          {post?.username?.charAt(0)}
                        </IconStyled>
                        <NameContainerStyled
                          onClick={() => {
                            navigate(`/posts/${post?.username}`);
                          }}
                        >
                          {post?.username}
                        </NameContainerStyled>
                      </IconAndNameContainerStyled>
                      <DateContainerStyled>
                        {getDate(post?.createdAt).hourDateString}
                      </DateContainerStyled>
                      <TextContainerStyled>{post?.content}</TextContainerStyled>
                      <Comments postId={post?._id}></Comments>
                    </PostContainerStyled>
                  );
                })}
              </PageWrapperStyled>
            );
          })}
        {isFetching && !currentData && (
          <FeedLoadingIcon
            stroke="#98ff98"
            strokeOpacity={0.125}
            speed={0.75}
          ></FeedLoadingIcon>
        )}
        {isFetching && !shouldShowPosts && currentData && (
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
        {!isFetching && isSuccess && data?.posts?.length === 15 && (
          <NextPageButtonStyled
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Ver mas...
          </NextPageButtonStyled>
        )}
      </PostsContainerStyled>
    </>
  );
};

export default PostSection;
