import React from "react";
import PostSection from "../PostSection/PostSection";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UsernameStyled,
  ProfileStyled,
  NameStyled,
  StatsContainerStyled,
  StatTextStyled,
  ProfileLoadingIconStyled,
} from "./ProfileStyled";
import { useGetProfileInfoQuery } from "../../store/api/apiSlice";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

const Profile = () => {
  const { username } = useParams();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const { data, error, isFetching, isLoading, isSuccess, isError } =
    useGetProfileInfoQuery(username);

  return (
    <>
      <ProfileStyled>
        {isFetching && <ProfileLoadingIconStyled></ProfileLoadingIconStyled>}
        {!isFetching && (
          <>
            <UsernameStyled>{username}</UsernameStyled>
            <NameStyled>{data?.nombre}</NameStyled>
            <StatsContainerStyled>
              <StatTextStyled>
                <FaUserFriends></FaUserFriends> {data?.friendsCount}{" "}
                {data?.friendsCount === 1 ? "amigo" : "amigos"} |{" "}
              </StatTextStyled>
              <StatTextStyled>
                {" "}
                <BsFillFileEarmarkPostFill></BsFillFileEarmarkPostFill>{" "}
                {data?.postsCount} {data?.postsCount === 1 ? "post" : "posts"} |
              </StatTextStyled>
              <StatTextStyled>
                <FaCommentDots></FaCommentDots> {data?.commentsCount}{" "}
                {data?.commentsCount === 1 ? "comentario" : "comentarios"}
              </StatTextStyled>
            </StatsContainerStyled>
          </>
        )}
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
