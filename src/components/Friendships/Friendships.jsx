import React, { useEffect } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";

import {
  ActionFriendBtnStyled,
  DoubleActionBtnContainerStyled,
  FriendMessageStyled,
  FriendSectionContainerStyled,
  FriendshipLoadingIcon,
} from "./FriendshipsStyled";
import {
  useGetFriendRequestStatusQuery,
  useSendFriendRequestMutation,
} from "../../store/api/apiSlice";
import { useSelector } from "react-redux";
import SendFriendRequest from "./SendFriendRequest/SendFriendRequest";

const Friendships = ({ loggedUser, profileUser }) => {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const { data, error, currentData, isFetching, isSuccess, isError, refetch } =
    useGetFriendRequestStatusQuery(profileUser, {
      skip: loggedUser === profileUser,
      pollingInterval: 30000,
    });

  return (
    <FriendSectionContainerStyled>
      {isFetching && !currentData && (
        <FriendshipLoadingIcon
          stroke="#4cc600"
          strokeOpacity={0.125}
          speed={0.75}
        ></FriendshipLoadingIcon>
      )}
      {currentData && (
        <>
          {data?.estado === "inexistente" && (
            <SendFriendRequest
              token={token}
              username={profileUser}
              isFetching={isFetching}
            ></SendFriendRequest>
          )}
          {data?.estado === "amigos" && (
            <ActionFriendBtnStyled remove>
              <IoPersonRemoveSharp></IoPersonRemoveSharp> Eliminar amigo
            </ActionFriendBtnStyled>
          )}
          {data?.estado === "pendiente" &&
            data?.friendRequest?.emitterUsername === loggedUser && (
              <FriendMessageStyled>
                {profileUser +
                  " aun no ha aceptado tu solicitud de amistad 👀..."}
              </FriendMessageStyled>
            )}
          {data?.estado === "pendiente" &&
            data?.friendRequest?.recieverUsername === loggedUser && (
              <>
                <FriendMessageStyled>
                  Tienes una solicitud de amistad pendiente de {profileUser}{" "}
                  👀...
                </FriendMessageStyled>
                <DoubleActionBtnContainerStyled>
                  <ActionFriendBtnStyled>
                    <IoIosPersonAdd></IoIosPersonAdd> Aceptar
                  </ActionFriendBtnStyled>
                  <ActionFriendBtnStyled remove>
                    <IoPersonRemoveSharp></IoPersonRemoveSharp> Rechazar
                  </ActionFriendBtnStyled>
                </DoubleActionBtnContainerStyled>
              </>
            )}
          {data?.estado === "rechazado" &&
            data?.friendRequest?.emitterUsername === loggedUser && (
              <FriendMessageStyled>
                {profileUser + " ha rechazado tu solicitud de amistad 😕..."}
              </FriendMessageStyled>
            )}
          {data?.estado === "rechazado" &&
            data?.friendRequest?.recieverUsername === loggedUser && (
              <>
                <FriendMessageStyled>
                  Habias rechazado una solicitud previa de {profileUser} pero
                  puedes enviarle una 👀...
                </FriendMessageStyled>
                <ActionFriendBtnStyled>
                  <IoIosPersonAdd></IoIosPersonAdd> Agregar Amigo
                </ActionFriendBtnStyled>
              </>
            )}
        </>
      )}
    </FriendSectionContainerStyled>
  );
};

export default Friendships;
