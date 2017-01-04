import React, { Component } from "react";

import LoginForm from "./LoginForm";

class LoginPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h2 className="text-center">Login</h2>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
