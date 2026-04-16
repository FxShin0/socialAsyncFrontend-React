import React from "react";
import {
  BrowserRouter,
  Routes as ReactDomRoutes,
  Route,
} from "react-router-dom";
import RL_Layout from "../components/Layouts/RegisterLogin/RL_Layout";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactDomRoutes>
        <Route element={<RL_Layout></RL_Layout>}>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Route>
      </ReactDomRoutes>
    </BrowserRouter>
  );
};

export default Routes;
