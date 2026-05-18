import React from "react";
import PostSection from "../PostSection/PostSection";
import { useSelector } from "react-redux";
import { useGetUserFeedQuery } from "../../store/api/apiSlice";

const Feed = () => {
  const user = useSelector((state) => {
    return state.auth.user;
  });

  return (
    <PostSection
      mode="feed"
      canPost={true}
      endOfPostsMsg="Parece que ya no hay mas contenido que mostrar. Agrega mas amigos
              para ver sus publicaciones!"
      postsAuthor={user}
      errorMsgHeader="Ocurrio un error al mostrar el feed: "
    ></PostSection>
  );
};

export default Feed;
