import React from "react";
import {
  ActionFriendBtnStyled,
  ActionFriendshipLoadingIcon,
  DoubleActionBtnContainerStyled,
  FriendMessageStyled,
} from "../FriendshipsStyled";
import { IoIosPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useAcceptOrRejectFriendRequestMutation } from "../../../store/api/apiSlice";
import { setFriendshipStatus } from "../../../slices/friendSlice";
import { useDispatch } from "react-redux";

const AcceptOrRejectFriendRequest = ({ user, token, isFetching }) => {
  const [acceptOrRejectFriendRequest, { data, isLoading, error }] =
    useAcceptOrRejectFriendRequestMutation();
  const dispatch = useDispatch();

  const handleClick = async (action) => {
    try {
      const result = await acceptOrRejectFriendRequest({
        username: user,
        token,
        action,
      }).unwrap();
      dispatch(
        setFriendshipStatus({
          currentStatus: action === "true" ? true : false,
        }),
      );
    } catch (err) {}
  };
  return (
    <>
      {isLoading && (
        <ActionFriendshipLoadingIcon
          stroke="#3b9403"
          strokeOpacity={0.125}
          speed={0.75}
        ></ActionFriendshipLoadingIcon>
      )}
      {!error && (
        <FriendMessageStyled>
          Tienes una solicitud de amistad pendiente de {user} 👀...
        </FriendMessageStyled>
      )}
      {!isFetching && !isLoading && !error && (
        <>
          <DoubleActionBtnContainerStyled>
            <ActionFriendBtnStyled
              onClick={() => {
                handleClick("true");
              }}
            >
              <IoIosPersonAdd></IoIosPersonAdd> Aceptar
            </ActionFriendBtnStyled>
            <ActionFriendBtnStyled
              remove="true"
              onClick={() => {
                handleClick("false");
              }}
            >
              <IoPersonRemoveSharp></IoPersonRemoveSharp> Rechazar
            </ActionFriendBtnStyled>
          </DoubleActionBtnContainerStyled>
        </>
      )}
      {error && (
        <FriendMessageStyled>
          Ha ocurrido un error al enviar la solicitud: {error.data.msg}
        </FriendMessageStyled>
      )}
    </>
  );
};

export default AcceptOrRejectFriendRequest;
