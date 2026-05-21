import React from "react";
import {
  ActionFriendBtnStyled,
  FriendMessageStyled,
} from "../FriendshipsStyled";
import { IoIosPersonAdd } from "react-icons/io";
import { useSendFriendRequestMutation } from "../../../store/api/apiSlice";
import { SendFriendshipLoadingIcon } from "./SendFriendRequestStyled";

const SendFriendRequest = ({ token, username, isFetching }) => {
  const [sendFriendRequest, { data, isLoading, error }] =
    useSendFriendRequestMutation();
  const handleClick = async () => {
    try {
      const result = await sendFriendRequest({
        token,
        username,
      }).unwrap();
    } catch (err) {}
  };
  return (
    <>
      {isLoading && (
        <SendFriendshipLoadingIcon
          stroke="#3b9403"
          strokeOpacity={0.125}
          speed={0.75}
        ></SendFriendshipLoadingIcon>
      )}
      {!isLoading && !isFetching && !error && (
        <ActionFriendBtnStyled onClick={handleClick}>
          <IoIosPersonAdd></IoIosPersonAdd> Agregar Amigo
        </ActionFriendBtnStyled>
      )}
      {!error && (
        <FriendMessageStyled>
          Psst 👀... Si quieres ver sus posts agregalo como amigo!
        </FriendMessageStyled>
      )}
      {error && (
        <FriendMessageStyled>
          Ha ocurrido un error al enviar la solicitud: {error.data.msg}
        </FriendMessageStyled>
      )}
    </>
  );
};

export default SendFriendRequest;
