import {
  BrowserRouter,
  Navigate,
  Routes as ReactDomRoutes,
  Route,
} from "react-router-dom";
import Logged_Layout from "../components/Layouts/LoggedIn/Logged_Layout";
import RL_Layout from "../components/Layouts/RegisterLogin/RL_Layout";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import Profile from "../components/Profile/Profile";
import Feed from "../components/Feed/Feed";
import LoginProtected from "../components/protectedRoutes/Login/LoginProtected";
import UnloggedProtected from "../components/protectedRoutes/Unlogged/UnloggedProtected";
import Register from "../components/Register/Register";
import SessionExpired from "../components/SessionExpired/SessionExpired";
import SearchMobile from "../components/Search/SearchMobile/SearchMobile";
import FriendsGeneral from "../components/Friends/FriendsGeneral";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactDomRoutes>
        <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
        <Route
          element={<UnloggedProtected redirectTo={"/feed"}></UnloggedProtected>}
        >
          <Route element={<RL_Layout></RL_Layout>}>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route
              path="/sessionExpired"
              element={<SessionExpired></SessionExpired>}
            ></Route>
          </Route>
        </Route>
        <Route
          element={<LoginProtected redirectTo={"/login"}></LoginProtected>}
        >
          <Route element={<Logged_Layout></Logged_Layout>}>
            <Route path="/feed" element={<Feed></Feed>}></Route>
            <Route
              path="/posts/:username"
              element={<Profile></Profile>}
            ></Route>
            <Route
              path="/search"
              element={<SearchMobile></SearchMobile>}
            ></Route>
            <Route
              path="/friends"
              element={<FriendsGeneral></FriendsGeneral>}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </ReactDomRoutes>
    </BrowserRouter>
  );
};

export default Routes;
