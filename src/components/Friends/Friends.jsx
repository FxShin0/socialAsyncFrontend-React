import React from "react";
import {
  FriendCardStyled,
  FriendIconStyled,
  FriendsContainerStyled,
  NameStyled,
  UsernameAndNameContainerStyled,
  UsernameStyled,
} from "./FriendsStyled";

const Friends = () => {
  return (
    <FriendsContainerStyled>
      <FriendCardStyled>
        <FriendIconStyled></FriendIconStyled>
        <UsernameAndNameContainerStyled>
          <UsernameStyled>Krassus</UsernameStyled>
          <NameStyled>John Doe</NameStyled>
        </UsernameAndNameContainerStyled>
      </FriendCardStyled>
    </FriendsContainerStyled>
  );
};

export default Friends;
