import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import Friends from "../../Friends/Friends";
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
} from "./Logged_LayoutStyled";
import Search from "../../Search/Search";
import { apiSlice } from "../../../store/api/apiSlice";

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
        <Search></Search>
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
          <NavHomeIconStyled
            onClick={() => {
              navigate("/feed");
            }}
          ></NavHomeIconStyled>
          <NavUserIconStyled
            onClick={() => {
              navigate(`/posts/${username}`);
            }}
          ></NavUserIconStyled>
          <NavLogoutIconStyled
            onClick={() => {
              dispatch(logout());
              dispatch(apiSlice.util.resetApiState());
            }}
          ></NavLogoutIconStyled>
          <NavFriendIconStyled></NavFriendIconStyled>
        </LoggedNavbarPhoneStyled>
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
