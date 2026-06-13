import React, { useState } from "react";
import {
  GeneralContainerStyled,
  ViewSelectorStyled,
  ViewBtnStyled,
  PendingCounterStyled,
} from "./FriendsStyled";
import Friends from "./Friends";
import PendingFriends from "./PendingFriends";
import {
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
} from "../../store/api/apiSlice";
import { useSelector } from "react-redux";

const FriendsGeneral = () => {
  const [selectedView, setSelectedView] = useState("friends");
  const { data, error } = useGetFriendRequestsQuery(undefined);
  const newFriends = useSelector((state) => {
    return state.friend.newFriends;
  });

  return (
    <GeneralContainerStyled>
      <ViewSelectorStyled>
        <ViewBtnStyled
          onClick={() => {
            setSelectedView("friends");
          }}
          isActive={selectedView === "friends"}
        >
          Amigos
          {error && <PendingCounterStyled>e</PendingCounterStyled>}
          {!error && (
            <PendingCounterStyled>
              {newFriends ? newFriends.length : 0}
            </PendingCounterStyled>
          )}
        </ViewBtnStyled>
        <ViewBtnStyled
          onClick={() => {
            setSelectedView("pending");
          }}
          isActive={selectedView === "pending"}
        >
          Pendientes
          {error && <PendingCounterStyled>e</PendingCounterStyled>}
          {!error && (
            <PendingCounterStyled>
              {data ? data.friendRequests.length : 0}
            </PendingCounterStyled>
          )}
        </ViewBtnStyled>
      </ViewSelectorStyled>
      {selectedView === "friends" && <Friends></Friends>}
      {selectedView === "pending" && <PendingFriends></PendingFriends>}
    </GeneralContainerStyled>
  );
};

export default FriendsGeneral;
