import React from "react";
import {
  BrowserRouter,
  Navigate,
  Routes as ReactDomRoutes,
  Route,
} from "react-router-dom";
import RL_Layout from "../components/Layouts/RegisterLogin/RL_Layout";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Logged_Layout from "../components/Layouts/LoggedIn/Logged_Layout";
import { useSelector } from "react-redux";
import LoginProtected from "../components/protectedRoutes/Login/LoginProtected";
import NotFound from "../components/NotFound/NotFound";
import UnloggedProtected from "../components/protectedRoutes/Unlogged/UnloggedProtected";
import SessionExpired from "../components/SessionExpired/SessionExpired";

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
            <Route path="/feed" element={<p>Feed</p>}></Route>
            <Route path="/posts/:username"></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </ReactDomRoutes>
    </BrowserRouter>
  );
};

export default Routes;
