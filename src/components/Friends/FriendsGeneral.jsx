import React, { useState } from "react";
import {
  GeneralContainerStyled,
  ViewSelectorStyled,
  ViewBtnStyled,
  PendingCounterStyled,
} from "./FriendsStyled";
import Friends from "./Friends";
import PendingFriends from "./PendingFriends";
import { useGetFriendRequestsQuery } from "../../store/api/apiSlice";

const FriendsGeneral = () => {
  const [selectedView, setSelectedView] = useState("friends");
  const { data, error } = useGetFriendRequestsQuery(undefined);

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
              {data?.friendRequests?.length}
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
