import React, { useEffect } from "react";
import {
  FriendCardStyled,
  FriendIconStyled,
  FriendsContainerStyled,
  FriendsTitleStyled,
  NameStyled,
  NoFriendsMessage,
  UsernameAndNameContainerStyled,
  UsernameStyled,
  NewFriendBanner,
} from "./FriendsStyled";
import { apiSlice, useGetFriendsQuery } from "../../store/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../helpers/getDateString";
import {
  ErrorMessageStyled,
  RL_LoadingIconStyled,
} from "../RL_Shared/RL_Styled";
import { useNavigate } from "react-router-dom";
import { logout, setSessionExpired } from "../../slices/authSlice";
import { IconStyled } from "../PostsStyles/PostSectionStyled";
import { useIsDesktop } from "../../customHooks/useIsDesktop";
import { resetNewFriends } from "../../slices/friendSlice";

const Friends = () => {
  const { data, error, isFetching, currentData, isSuccess, isError } =
    useGetFriendsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.auth.user;
  });
  const newFriends = useSelector((state) => {
    return state.friend.newFriends;
  });
  const variation = useSelector((state) => {
    return state.friend.variation;
  });
  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    useEffect(() => {
      return () => {
        dispatch(resetNewFriends());
      };
    }, []);
  } else {
    useEffect(() => {
      setTimeout(() => {
        dispatch(resetNewFriends());
      }, 4000);
    }, [variation]);
  }
  return (
    <FriendsContainerStyled>
      <FriendsTitleStyled>Amigos</FriendsTitleStyled>
      {currentData &&
        data.friendList.map((friend) => {
          const shouldShowDate =
            newFriends === null || !newFriends.includes(friend._id);
          const shouldShowNewBadge =
            newFriends && newFriends.includes(friend._id);
          return (
            <FriendCardStyled
              key={friend._id}
              onClick={() => {
                navigate(
                  `/posts/${
                    friend.emitterUsername == username
                      ? friend.recieverUsername
                      : friend.emitterUsername
                  }`,
                );
              }}
            >
              <IconStyled>
                {friend.emitterUsername == username
                  ? friend.recieverUsername.charAt(0)
                  : friend.emitterUsername.charAt(0)}
              </IconStyled>
              <UsernameAndNameContainerStyled>
                <UsernameStyled>
                  {friend.emitterUsername == username
                    ? friend.recieverUsername
                    : friend.emitterUsername}
                </UsernameStyled>
                {shouldShowNewBadge && (
                  <NewFriendBanner>{"[Nuevo]"}</NewFriendBanner>
                )}
                {shouldShowDate && (
                  <NameStyled>
                    Desde: {getDate(friend.updatedAt).hourDateString}
                  </NameStyled>
                )}
              </UsernameAndNameContainerStyled>
            </FriendCardStyled>
          );
        })}

      {isFetching && !currentData && (
        <RL_LoadingIconStyled
          stroke="#98ff98"
          strokeOpacity={0.125}
          speed={0.75}
        ></RL_LoadingIconStyled>
      )}
      {isError && (
        <ErrorMessageStyled>
          Ocurrio un error al obtener la lista de amigos: {error.msg}
        </ErrorMessageStyled>
      )}
      {currentData?.friendList?.length === 0 && (
        <NoFriendsMessage>No tienes amigos agregados 👀</NoFriendsMessage>
      )}
    </FriendsContainerStyled>
  );
};

export default Friends;
