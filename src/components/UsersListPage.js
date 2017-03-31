import React from "react";

import Userslist from "../containers/UsersList";
import UserDescription from "../containers/UserDescription";

import "../styles/usersList.scss";

const UsersListPage = () => {
  return (
    <div className="row">
      <div className="col-lg-12 users-list">
        <Userslist className="users-List"/>
        <UserDescription />
      </div>
    </div>
  );
};


//<div className="vertical-line col-xs-1"></div>

export default UsersListPage;
