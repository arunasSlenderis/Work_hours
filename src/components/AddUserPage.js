import React from "react";

import AddUserForm from "../containers/AddUserForm";

const AddUserPage = () => {
  return (
    <div className="row">
      <div className="col-sm-4 col-sm-offset-4">
        <h2 className="text-center">ADD NEW USER</h2>
        <AddUserForm />
      </div>
    </div>
  );
};

export default AddUserPage;
