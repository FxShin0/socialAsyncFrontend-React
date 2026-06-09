import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsDesktop } from "../../../customHooks/useIsDesktop";
import { logout } from "../../../slices/authSlice";
import {
  apiSlice,
  useGetFriendRequestsQuery,
} from "../../../store/api/apiSlice";
import FriendsGeneral from "../../Friends/FriendsGeneral";
import { PendingCounterStyled } from "../../Friends/FriendsStyled";
import SA_Logo from "../../SA_Logo/SA_Logo";
import SearchDesktop from "../../Search/SearchDesktop/SearchDesktop";
import {
  FriendSectionStyled,
  LayoutContainerStyled,
  LoggedNavbarPhoneStyled,
  LoggedNavbarStyled,
  MainContainerStyled,
  NavButtonContainerStyled,
  NavButtonNameStyled,
  NavFriendIconStyled,
  NavFriendIconWrapper,
  NavHomeIconStyled,
  NavLogoutIconStyled,
  NavProfileAndLogoutContainerStyled,
  NavUserIconStyled,
  SearchIconStyled,
} from "./Logged_LayoutStyled";
import { useEffect, useRef, useState } from "react";
import { mergeQueryLivePosts, setScrollPxUI } from "../../../slices/feedSlice";
import { ResultUsernameStyled } from "../../Search/SearchDesktop/SearchDesktopStyled";

const Logged_Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryPosts = useSelector((state) => {
    return state.feed.queryPosts;
  });
  const username = useSelector((state) => {
    return state.auth.user;
  });
  const mainContainerRef = useRef(null);
  const scrollRef = useRef(0);
  const isDesktop = useIsDesktop();
  const { data } = useGetFriendRequestsQuery(undefined, {
    pollingInterval: 10000, //to give that real-time feeling but it should be higher if the app scaled
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
        <SearchDesktop></SearchDesktop>
        <NavProfileAndLogoutContainerStyled>
          <NavButtonContainerStyled
            onClick={() => {
              navigate("/feed");
            }}
          >
            <NavHomeIconStyled></NavHomeIconStyled>
            <NavButtonNameStyled>Inicio</NavButtonNameStyled>
          </NavButtonContainerStyled>
          <NavButtonContainerStyled
            onClick={() => {
              navigate(`/posts/${username}`);
            }}
          >
            <NavUserIconStyled></NavUserIconStyled>
            <NavButtonNameStyled>{username}</NavButtonNameStyled>
          </NavButtonContainerStyled>
          <NavButtonContainerStyled
            onClick={() => {
              dispatch(logout());
              dispatch(apiSlice.util.resetApiState());
            }}
          >
            <NavButtonNameStyled>Cerrar sesión</NavButtonNameStyled>
            <NavLogoutIconStyled></NavLogoutIconStyled>
          </NavButtonContainerStyled>
        </NavProfileAndLogoutContainerStyled>
      </LoggedNavbarStyled>
      <LayoutContainerStyled>
        <LoggedNavbarPhoneStyled>
          <SearchIconStyled
            onClick={() => {
              navigate(`/search`);
            }}
          ></SearchIconStyled>
          <NavUserIconStyled
            onClick={() => {
              navigate(`/posts/${username}`);
            }}
          ></NavUserIconStyled>
          <NavHomeIconStyled
            onClick={() => {
              navigate("/feed");
            }}
          ></NavHomeIconStyled>
          <NavFriendIconWrapper>
            <PendingCounterStyled>
              {data?.friendRequests?.length}
            </PendingCounterStyled>
            <NavFriendIconStyled
              onClick={() => {
                navigate("/friends");
              }}
            ></NavFriendIconStyled>
          </NavFriendIconWrapper>
          <NavLogoutIconStyled
            onClick={() => {
              dispatch(logout());
              dispatch(apiSlice.util.resetApiState());
            }}
          ></NavLogoutIconStyled>
        </LoggedNavbarPhoneStyled>
        <MainContainerStyled
          ref={mainContainerRef}
          onScroll={(e) => {
            if (location && location.pathname === "/feed") {
              scrollRef.current = e.target.scrollTop;
            }
            if (queryPosts.length != 0 && e.target.scrollTop <= 100) {
              dispatch(mergeQueryLivePosts());
            }
          }}
        >
          <Outlet context={{ mainContainerRef, scrollRef }}></Outlet>
        </MainContainerStyled>
        {isDesktop && (
          <FriendSectionStyled>
            <FriendsGeneral></FriendsGeneral>
          </FriendSectionStyled>
        )}
      </LayoutContainerStyled>
    </>
  );
};

export default Logged_Layout;
