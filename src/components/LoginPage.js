import React from "react";

import LoginForm from "../containers/LoginForm";

const LoginPage = () => {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <h2 className="text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
