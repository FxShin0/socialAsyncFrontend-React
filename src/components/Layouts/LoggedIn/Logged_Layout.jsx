import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsDesktop } from "../../../customHooks/useIsDesktop";
import { logout } from "../../../slices/authSlice";
import {
  apiSlice,
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
} from "../../../store/api/apiSlice";
import FriendsGeneral from "../../Friends/FriendsGeneral";
import {
  ActionFriendBtnStyled,
  PendingCounterStyled,
} from "../../Friends/FriendsStyled";
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
import {
  mergeQueryLivePosts,
  resetFeed,
  setFeedNeedsRefetch,
  setScrollPxUI,
} from "../../../slices/feedSlice";
import { ResultUsernameStyled } from "../../Search/SearchDesktop/SearchDesktopStyled";
import {
  setNewFriends,
  setPendingVariation,
} from "../../../slices/friendSlice";

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
  const variation = useSelector((state) => {
    return state.friend.variation;
  });
  const newFriends = useSelector((state) => {
    return state.friend.newFriends;
  });
  const feedNeedsRefetch = useSelector((state) => {
    return state.feed.feedNeedsRefetch;
  });
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const mainContainerRef = useRef(null);
  const scrollRef = useRef(0);
  const isDesktop = useIsDesktop();
  const {
    currentData: friendRequestsData,
    isFetching: isFetchingFriendRequests,
  } = useGetFriendRequestsQuery(undefined, {
    pollingInterval: 10000, //to give that real-time feeling but it should be higher if the app scaled
  });
  const { currentData: friendListData, isFetching: isFetchingFriendListData } =
    useGetFriendsQuery(undefined, {
      pollingInterval: 10000,
      //to give that real-time feeling but it should be higher if the app scaled
    });
  useEffect(() => {
    if (!friendListData || isFetchingFriendListData) return;
    dispatch(
      setNewFriends({
        currentFriends: friendListData.friendList,
        loggedUser: user,
      }),
    ); //para detectar nuevas amistades y variaciones
  }, [isFetchingFriendListData, friendListData]);

  useEffect(() => {
    if (!friendRequestsData || isFetchingFriendRequests) return;
    dispatch(
      setPendingVariation({
        friendRequests: friendRequestsData.friendRequests,
      }),
    ); //para detectar variaciones en el numero de solicitudes de amistad
  }, [isFetchingFriendRequests, friendRequestsData]);

  useEffect(() => {
    if (variation === 0) return;

    //si no esta en el feed deja pendiente el refetch para que lo detecte el onScroll de logged layout, si estaba en feed esto no se triggerea
    dispatch(setFeedNeedsRefetch({ feedNeedsRefetch: true }));
  }, [variation]);

  useEffect(() => {
    if (location.pathname === "/feed")
      dispatch(setScrollPxUI({ scrollPx: mainContainerRef.current.scrollTop }));
  }, [location.pathname]);

  return (
    <>
      <LoggedNavbarStyled>
        <SA_Logo
          onClick={() => {
            navigate("/feed");
          }}
          $shouldpoint="true"
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
              dispatch({ type: "app/logout" });
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
            <PendingCounterStyled
              onClick={() => {
                navigate("/friends");
              }}
            >
              {friendRequestsData?.friendRequests?.length === undefined
                ? 0
                : friendRequestsData?.friendRequests?.length +
                  (newFriends ? newFriends.length : 0)}
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
              dispatch({ type: "app/logout" });
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
            if (location.pathname === "/feed" && e.target.scrollTop <= 50) {
              dispatch(setScrollPxUI({ scrollPx: e.target.scrollTop }));
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
