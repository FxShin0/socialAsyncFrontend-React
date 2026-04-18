import React from "react";
import {
  FriendSectionStyled,
  LayoutContainerStyled,
  LoggedNavbarStyled,
  LogoutContainerStyled,
  LogoutIconStyled,
  LogoutTextStyled,
  MainContainerStyled,
  NavProfileAndLogoutContainerSylted,
  NavProfileContainerStyled,
  NavProfileIconStyled,
  NavProfileNameStyled,
  SearchFriendsInputStyled,
} from "./Logged_LayoutStyled";
import SA_Logo from "../../SA_Logo/SA_Logo";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/authSlice";
import Friends from "../../Friends/Friends";

const Logged_Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.auth.user;
  });
  return (
    <>
      <LoggedNavbarStyled>
        <SA_Logo
          onClick={() => {
            navigate("/feed");
          }}
          shouldpoint="true"
        ></SA_Logo>
        <SearchFriendsInputStyled
          placeholder="Buscar personas..."
          type="text"
        ></SearchFriendsInputStyled>
        <NavProfileAndLogoutContainerSylted>
          <NavProfileContainerStyled
            onClick={() => {
              navigate(`/posts/${username}`);
            }}
          >
            <NavProfileIconStyled></NavProfileIconStyled>
            <NavProfileNameStyled>{username}</NavProfileNameStyled>
          </NavProfileContainerStyled>
          <LogoutContainerStyled
            onClick={() => {
              dispatch(logout());
            }}
          >
            <LogoutTextStyled>Cerrar sesión</LogoutTextStyled>
            <LogoutIconStyled></LogoutIconStyled>
          </LogoutContainerStyled>
        </NavProfileAndLogoutContainerSylted>
      </LoggedNavbarStyled>
      <LayoutContainerStyled>
        <MainContainerStyled>
          <Outlet></Outlet>
        </MainContainerStyled>
        <FriendSectionStyled>
          <Friends></Friends>
        </FriendSectionStyled>
      </LayoutContainerStyled>
    </>
  );
};

export default Logged_Layout;
