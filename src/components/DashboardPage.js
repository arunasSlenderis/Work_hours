import React from "react";

import ProjectsList from "../containers/ProjectsList";
import ProjectDescription from "../containers/ProjectDescription";

const DashboardPage = () => {
  return (
    <div className="row">
      <ProjectsList />
      <div className="vertical-line col-xs-1"></div>
      <ProjectDescription />
    </div>
  );
};

export default DashboardPage;
