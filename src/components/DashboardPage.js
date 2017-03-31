import React from "react";

import ProjectsList from "../containers/ProjectsList";
import ProjectDescription from "../containers/ProjectDescription";

import "../styles/dashboard.scss";

const DashboardPage = () => {
  return (
    <div className="row dashboard">
      <ProjectsList className="projects-List"/>
      <ProjectDescription className="project-Description"/>
    </div>
  );
};

//<div className="vertical-line col-xs-1"></div>

export default DashboardPage;
