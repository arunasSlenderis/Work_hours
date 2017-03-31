import React from "react";

import AddProjectForm from "../containers/AddProjectForm";

const AddProjectPage = () => {
  return (
    <div className="row">
      <div className="col-sm-4 col-sm-offset-4">
        <h2 className="text-center">ADD NEW PROJECT</h2>
        <AddProjectForm />
      </div>
    </div>
  );
};

export default AddProjectPage;
