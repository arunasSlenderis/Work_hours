import React from "react";
import { Route } from "react-router";

import App from "./containers/App";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import requireAuth from "./utils/requireAuth";
import ifAuthenticated from "./utils/ifAuthenticated";

export default (
  <Route path="/" component={ App }>
    <Route path="login" component={ ifAuthenticated(LoginPage) } />
    <Route path="dashboard" component={ requireAuth(DashboardPage) } />
  </Route>
);
