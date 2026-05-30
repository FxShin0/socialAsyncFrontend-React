import React, { useEffect, useRef, useState } from "react";
import {
  useAcceptOrRejectFriendRequestMutation,
  useGetFriendRequestsQuery,
} from "../../store/api/apiSlice";
import {
  FriendCardStyled,
  FriendsContainerStyled,
  UsernameAndNameContainerStyled,
  UsernameStyled,
  NoFriendsMessage,
  FriendsTitleStyled,
  ActionFriendBtnStyled,
  ActionsContainerStyled,
  ViewTitleAndStatusContainer,
  LoadingIconStyled,
  NewFriendMessage,
} from "./FriendsStyled";
import {
  RL_LoadingIconStyled,
  ErrorMessageStyled,
} from "../RL_Shared/RL_Styled";
import { IconStyled } from "../PostSection/PostSectionStyled";
import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../../customHooks/useIsDesktop";
import { useSelector } from "react-redux";
import { useAcceptOrRejectFriendRequest } from "../../customHooks/useAcceptOrRejectFriend";
const PendingFriends = () => {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const { data, isLoading, error, currentData, isFetching } =
    useGetFriendRequestsQuery(undefined);
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const {
    data: actionData,
    isLoading: actionIsLoading,
    error: actionError,
    handleClick,
  } = useAcceptOrRejectFriendRequest({ token });
  const checkTimerRef = useRef();
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    if (!actionData) return;
    clearTimeout(checkTimerRef.current);
    setShowConfirmation(true);
    checkTimerRef.current = setTimeout(() => {
      setShowConfirmation(false);
    }, 4000);
  }, [actionData]);
  return (
    <FriendsContainerStyled>
      <ViewTitleAndStatusContainer>
        <FriendsTitleStyled>Pendientes</FriendsTitleStyled>
        {actionIsLoading && (
          <LoadingIconStyled
            isDesktop={isDesktop}
            stroke="#98ff98"
            strokeOpacity={0.125}
            speed={0.75}
          ></LoadingIconStyled>
        )}
        {actionError && (
          <ErrorMessageStyled>
            Ha ocurrido un error : {actionError.msg}
          </ErrorMessageStyled>
        )}
        {showConfirmation && (
          <NewFriendMessage>
            {actionData?.newFriendship?.isRejected === false
              ? `Ahora ${actionData?.newFriendship?.emitterUsername} y tu son amigos 😄!`
              : `Has rechazado a ${actionData?.newFriendship?.emitterUsername}.`}
          </NewFriendMessage>
        )}
      </ViewTitleAndStatusContainer>
      {currentData &&
        data?.friendRequests?.map((pending) => {
          return (
            <FriendCardStyled key={pending._id}>
              <IconStyled
                onClick={() => {
                  navigate(`/posts/${pending.emitterUsername}`);
                }}
              >
                {pending.emitterUsername.charAt(0)}
              </IconStyled>
              <UsernameAndNameContainerStyled>
                <UsernameStyled
                  onClick={() => {
                    navigate(`/posts/${pending.emitterUsername}`);
                  }}
                >
                  {pending.emitterUsername}
                </UsernameStyled>
                <ActionsContainerStyled>
                  <ActionFriendBtnStyled
                    isDesktop={isDesktop}
                    disabled={actionIsLoading}
                    onClick={() => {
                      handleClick("true", pending.emitterUsername);
                    }}
                  >
                    Aceptar
                  </ActionFriendBtnStyled>
                  <ActionFriendBtnStyled
                    onClick={() => {
                      handleClick("false", pending.emitterUsername);
                    }}
                    isDesktop={isDesktop}
                    disabled={actionIsLoading}
                    remove="true"
                  >
                    Rechazar
                  </ActionFriendBtnStyled>
                </ActionsContainerStyled>
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
      {error && (
        <ErrorMessageStyled>
          Ocurrio un error al obtener la lista de amigos: {error.msg}
        </ErrorMessageStyled>
      )}
      {currentData?.friendRequests?.length === 0 && (
        <NoFriendsMessage>No tienes solicitudes pendientes 👀</NoFriendsMessage>
      )}
    </FriendsContainerStyled>
  );
};

export default PendingFriends;
