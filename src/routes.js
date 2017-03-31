import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App";
import Home from "./containers/Home";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import requireAuth from "./utils/requireAuth";
import requireAdmin from "./utils/requireAdmin";
import ifAuthenticated from "./utils/ifAuthenticated";
import UsersListPage from "./components/UsersListPage";
import AddUserPage from "./components/AddUserPage";
import AddProjectPage from "./components/AddProjectPage";
import ManageProjectsPage from "./components/ManageProjectsPage";

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="login" component={ ifAuthenticated(LoginPage) } />
    <Route path="dashboard" component={ requireAuth(DashboardPage) } />
    <Route path="userList" component={
        requireAuth(UsersListPage) && requireAdmin(UsersListPage)
      }
    />
    <Route path="addUser" component={
        requireAuth(AddUserPage) && requireAdmin(AddUserPage)
      }
    />
    <Route path="addProject" component={
        requireAuth(AddProjectPage) && requireAdmin(AddProjectPage)
      }
    />
  <Route path="manageProjects" component={
      requireAuth(ManageProjectsPage)
    }
  />
  </Route>
);
