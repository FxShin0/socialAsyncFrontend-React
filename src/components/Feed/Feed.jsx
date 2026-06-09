import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDelayedLoading } from "../../customHooks/useDelayedLoading";
import { initialValuesPost } from "../../formik/Post/initialValues";
import { validationSchemaPost } from "../../formik/Post/validationSchema";
import { autoExpandTextArea } from "../../helpers/autoExpandTextArea";
import { getDate } from "../../helpers/getDateString";
import { logout, setSessionExpired } from "../../slices/authSlice";
import { isEqual } from "lodash";
import {
  addNewUserPost,
  mergeQueryLivePosts,
  setLivePosts,
  setPageUI,
  setQueryPosts,
} from "../../slices/feedSlice";
import {
  apiSlice,
  useCreatePostMutation,
  useGetNewPostsQuery,
  useGetUserFeedQuery,
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
  NextPageButtonStyled,
  PageWrapperStyled,
  PostContainerStyled,
  PostErrorMessageStyled,
  PostInputStyled,
  PostLoadingIconStyled,
  PostsContainerStyled,
  PostsErrorMsgStyled,
  SendPostBtnStyled,
  SendPostFormContainerStyled,
  TextContainerStyled,
} from "../PostsStyles/PostSectionStyled";
import { NewPostsModalStyled } from "./FeedStyled";
import { smoothScrollToTop } from "../../helpers/smoothScrollToTop";

const Feed = () => {
  const [newPostId, setNewPostId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mainContainerRef, scrollRef } = useOutletContext();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const queryPosts = useSelector((state) => {
    return state.feed.queryPosts;
  });

  const [showNewPostsModal, setShowNewPostsModal] = useState(false);
  const newPostsModalTimeoutRef = useRef(null);
  const newPageRef = useRef(null);
  const firstPostPageRef = useRef(null);
  const [firstPostId, setFirstPostId] = useState(null);
  const page = useSelector((state) => {
    return state.feed.page;
  });
  const livePosts = useSelector((state) => {
    return state.feed.livePosts;
  });
  const mostRecentPostTime = useSelector((state) => {
    return state.feed.mostRecentPostTime;
  });
  const [newPostsIds, setNewPostsIds] = useState([]);
  const {
    data,
    error,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    currentData,
  } = useGetUserFeedQuery(page);
  const {
    data: newPostsData,
    error: newPostsError,
    isFetching: newPostsIsFetching,
    isLoading: newPostsIsLoading,
    isSuccess: newPostsIsSuccess,
    isError: newPostsIsError,
    currentData: newPostsCurrentData,
  } = useGetNewPostsQuery(mostRecentPostTime, {
    pollingInterval: 6000,
    skip: !mostRecentPostTime,
  });
  const showColdStart = useDelayedLoading(isFetching, 3000);
  const [
    createPost,
    { data: dataNewPost, isLoading: isLoadingNewPost, error: errorNewPost },
  ] = useCreatePostMutation();
  useLayoutEffect(() => {
    if (!mainContainerRef.current) return;
    if (!livePosts.length) return;

    mainContainerRef.current.scrollTop = scrollRef.current;
  }, [livePosts.length]);
  useEffect(() => {
    if (error?.data?.msg == "Token no valido") {
      dispatch(setSessionExpired(true));
      dispatch(apiSlice.util.resetApiState());
      dispatch(logout());
    }
  }, [error]);
  useEffect(() => {
    if (queryPosts.length === 0)
      setTimeout(() => {
        setNewPostsIds([]);
      }, 3000);
    else
      setNewPostsIds(
        queryPosts.map((post) => {
          return post._id;
        }),
      );
  }, [queryPosts]);
  useEffect(() => {
    if (!currentData?.posts) return;

    if (page != 1) setFirstPostId(currentData.posts[0]?._id);
    dispatch(setLivePosts({ posts: currentData.posts }));
  }, [currentData, page]);

  useEffect(() => {
    if (!firstPostPageRef.current) return;

    requestAnimationFrame(() => {
      firstPostPageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [livePosts.length]);

  useEffect(() => {
    if (!newPostsCurrentData || newPostsCurrentData.posts.length === 0) return;
    dispatch(setQueryPosts({ queryPosts: newPostsCurrentData.posts }));
    if (mainContainerRef.current.scrollTop <= 100) {
      setNewPostsIds(
        queryPosts.map((post) => {
          return post._id;
        }),
      );
      requestAnimationFrame(() => {
        dispatch(mergeQueryLivePosts());
      });
    } else {
      clearTimeout(newPostsModalTimeoutRef.current);
      setShowNewPostsModal(true);
      newPostsModalTimeoutRef.current = setTimeout(() => {
        setShowNewPostsModal(false);
      }, 9000);
    }
  }, [newPostsCurrentData]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let result = await createPost({
        token,
        content: values.post,
      }).unwrap();

      dispatch(
        addNewUserPost({ newPost: { ...result.post, isUserPost: true } }),
      );
      setNewPostId(result.post._id);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {
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
      }
      <PostsContainerStyled>
        {queryPosts.length > 0 &&
          mainContainerRef.current.scrollTop >= 100 &&
          showNewPostsModal && (
            <NewPostsModalStyled
              onClick={() => {
                smoothScrollToTop(mainContainerRef);
              }}
            >{`Hay ${queryPosts.length} ${queryPosts.length === 1 ? "post nuevo" : "posts nuevos"} 👀...`}</NewPostsModalStyled>
          )}
        {!isError &&
          (currentData || data) &&
          livePosts?.map((pageMap, indexMap) => {
            return (
              <PageWrapperStyled
                key={`page-${indexMap}`}
                shouldGlow={indexMap != 0 && indexMap === page - 1}
                ref={indexMap != 0 && indexMap === page - 1 ? newPageRef : null}
              >
                {pageMap.map((post, index) => {
                  return (
                    <PostContainerStyled
                      key={post?._id}
                      isNew={post?._id === newPostId}
                      ref={firstPostId === post?._id ? firstPostPageRef : null}
                      isRecentPost={newPostsIds.includes(post?._id)}
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
        {isFetching && currentData && (
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
              : `Ha ocurrido un error: ${error.data.msg}`}
          </PostsErrorMsgStyled>
        )}
        {!isFetching && isSuccess && data?.posts?.length != 15 && (
          <>
            <EndOfFeedIconStyled></EndOfFeedIconStyled>
            <EndOfFeedMsg>
              Parece que ya no hay mas contenido que mostrar...
            </EndOfFeedMsg>
          </>
        )}
        {!isFetching && isSuccess && data?.posts?.length === 15 && (
          <NextPageButtonStyled
            onClick={() => {
              dispatch(setPageUI({ page: page + 1 }));
            }}
          >
            Ver mas...
          </NextPageButtonStyled>
        )}
      </PostsContainerStyled>
    </>
  );
};

export default Feed;
