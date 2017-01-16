import React from "react";

import UserList from "../containers/UserList";

const DashboardPage = () => {
  return (
    <div className="col">
      <div className="col-md-4 col-md-offset-4">
        <UserList />
      </div>
    </div>
  );
};

export default DashboardPage;
