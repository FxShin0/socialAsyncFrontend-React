import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import FriendsGeneral from "../../Friends/FriendsGeneral";
import SA_Logo from "../../SA_Logo/SA_Logo";
import {
  FriendSectionStyled,
  LayoutContainerStyled,
  LoggedNavbarStyled,
  MainContainerStyled,
  NavButtonContainerStyled,
  NavProfileAndLogoutContainerStyled,
  NavUserIconStyled,
  NavLogoutIconStyled,
  NavHomeIconStyled,
  NavButtonNameStyled,
  LoggedNavbarPhoneStyled,
  NavFriendIconStyled,
  SearchIconStyled,
  NavFriendIconWrapper,
} from "./Logged_LayoutStyled";
import SearchDesktop from "../../Search/SearchDesktop/SearchDesktop";
import {
  apiSlice,
  useGetFriendRequestsQuery,
} from "../../../store/api/apiSlice";
import { useIsDesktop } from "../../../customHooks/useIsDesktop";
import { PendingCounterStyled } from "../../Friends/FriendsStyled";

const Logged_Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.auth.user;
  });
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
        <MainContainerStyled>
          <Outlet></Outlet>
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
