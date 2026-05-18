import React from "react";
import PostSection from "../PostSection/PostSection";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UsernameStyled, ProfileStyled } from "./ProfileStyled";

const Profile = () => {
  const { username } = useParams();
  const user = useSelector((state) => {
    return state.auth.user;
  });

  return (
    <>
      <ProfileStyled>
        <UsernameStyled>{username}</UsernameStyled>
      </ProfileStyled>
      <PostSection
        mode="user"
        canPost={username === user}
        endOfPostsMsg="Parece que ya no hay mas contenido que mostrar."
        postsAuthor={username}
        errorMsgHeader="Ocurrio un error al mostrar los posts del perfil: "
      ></PostSection>
    </>
  );
};

export default Profile;
