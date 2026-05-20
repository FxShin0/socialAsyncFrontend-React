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
import { IconStyled } from "../PostSection/PostSectionStyled";

const Friends = () => {
  const { data, error, isFetching, isSuccess, isError } = useGetFriendsQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.auth.user;
  });
  useEffect(() => {
    if (error?.data?.msg == "Token no valido") {
      dispatch(setSessionExpired(true));
      dispatch(apiSlice.util.resetApiState());
      dispatch(logout());
    }
  }, [error]);
  return (
    <FriendsContainerStyled>
      <FriendsTitleStyled>Amigos</FriendsTitleStyled>
      {isSuccess &&
        data.friendList.map((friend) => {
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
                <NameStyled>
                  Desde: {getDate(friend.updatedAt).hourDateString}
                </NameStyled>
              </UsernameAndNameContainerStyled>
            </FriendCardStyled>
          );
        })}
      {isFetching && (
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
      {data?.friendList?.length === 0 && (
        <NoFriendsMessage>No tienes amigos agregados 👀</NoFriendsMessage>
      )}
    </FriendsContainerStyled>
  );
};

export default Friends;
