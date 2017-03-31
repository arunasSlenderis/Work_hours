import React from "react";

import LoginForm from "../containers/LoginForm";

const LoginPage = () => {
  return (
    <div className="row">
      <div className="col-sm-4 col-sm-offset-4">
        <h2 className="text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
