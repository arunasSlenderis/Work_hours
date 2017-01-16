import React from "react";
import { Route } from "react-router";

import App from "./containers/App";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";

export default (
  <Route path="/" component={ App }>
    <Route path="login" component={ LoginPage } />
    <Route path="dashboard" component={ DashboardPage } />
  </Route>
);
