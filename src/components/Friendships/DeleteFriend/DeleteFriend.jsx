import React from "react";
import {
  FriendMessageStyled,
  ActionFriendBtnStyled,
  ActionFriendshipLoadingIcon,
} from "../FriendshipsStyled";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useDeleteFriendMutation } from "../../../store/api/apiSlice";
import { useDispatch } from "react-redux";
import { setFriendshipStatus } from "../../../slices/friendSlice";

const DeleteFriend = ({ profileUser, isFetching }) => {
  const [deleteFriend, { data, isLoading, error }] = useDeleteFriendMutation();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const result = await deleteFriend(profileUser).unwrap();
      dispatch(setFriendshipStatus({ currentStatus: false }));
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
          {profileUser} y tu son amigos 😄...
        </FriendMessageStyled>
      )}
      {!isFetching && !isLoading && !error && (
        <ActionFriendBtnStyled remove="true" onClick={handleClick}>
          <IoPersonRemoveSharp></IoPersonRemoveSharp> Eliminar amigo
        </ActionFriendBtnStyled>
      )}
      {error && (
        <FriendMessageStyled>
          Ha ocurrido un error al enviar la solicitud: {error.data.msg}
        </FriendMessageStyled>
      )}
    </>
  );
};

export default DeleteFriend;
