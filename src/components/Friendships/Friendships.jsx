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
import { useDispatch, useSelector } from "react-redux";
import SendFriendRequest from "./SendFriendRequest/SendFriendRequest";
import AcceptOrRejectFriendRequest from "./acceptOrRejectFriendRequest/AcceptOrRejectFriendRequest";
import DeleteFriend from "./DeleteFriend/DeleteFriend";
import { setFriendshipStatus } from "../../slices/friendSlice";

const Friendships = ({ loggedUser, profileUser }) => {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const variation = useSelector((state) => {
    return state.friend.variation;
  });
  const pendingVariation = useSelector((state) => {
    return state.friend.pendingVariation;
  });
  const dispatch = useDispatch();
  const { data, error, currentData, isFetching, isSuccess, isError, refetch } =
    useGetFriendRequestStatusQuery(profileUser, {
      skip: loggedUser === profileUser,
      refetchOnMountOrArgChange: true,
    });
  useEffect(() => {
    if (!data) return;
    if (data.estado === "amigos") {
      dispatch(setFriendshipStatus({ currentStatus: true }));
    } else {
      dispatch(setFriendshipStatus({ currentStatus: false }));
    }
  }, [data]);

  useEffect(() => {
    if (variation !== 0 || pendingVariation !== 0) refetch();
  }, [variation, pendingVariation]);

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
              msg="Psst 👀... Si quieres ver sus posts agregalo como amigo!"
            ></SendFriendRequest>
          )}
          {data?.estado === "amigos" && (
            <DeleteFriend profileUser={profileUser}></DeleteFriend>
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
              <AcceptOrRejectFriendRequest
                token={token}
                user={profileUser}
                isFetching={isFetching}
              ></AcceptOrRejectFriendRequest>
            )}
          {data?.estado === "rechazado" &&
            data?.friendRequest?.emitterUsername === loggedUser && (
              <FriendMessageStyled>
                {profileUser + " ha rechazado tu solicitud de amistad 😕..."}
              </FriendMessageStyled>
            )}
          {data?.estado === "rechazado" &&
            data?.friendRequest?.recieverUsername === loggedUser && (
              <SendFriendRequest
                token={token}
                username={profileUser}
                isFetching={isFetching}
                msg={`Rechazaste la solicitud de amistad de ${profileUser} pero
                  puedes enviarle una si cambias de opinion 👀...`}
              ></SendFriendRequest>
            )}
        </>
      )}
    </FriendSectionContainerStyled>
  );
};

export default Friendships;
