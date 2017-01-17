import React from "react";

import ProjectsList from "../containers/ProjectsList";

const DashboardPage = () => {
  return (
    <div className="col">
      <div className="col-md-4 col-md-offset-4">
        <h1>Projects list</h1>
        <ProjectsList />
      </div>
    </div>
  );
};

export default DashboardPage;
