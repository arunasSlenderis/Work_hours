import React from "react";

import UserList from "../containers/UserList";

const DashboardPage = () => {
  return (
    <div className="col">
      <div className="col-md-4 col-md-offset-4">
        <h1>User list</h1>
        <UserList />
      </div>
    </div>
  );
};

export default DashboardPage;
