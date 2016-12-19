import React from "react"; //eslint-disable-line no-unused-vars

require("../styles/loginForm.scss");

const LoginForm = () => {
  return (
    <div className="jumbotron">
      <h2 className="text-center login-title">Login form</h2>
      <form className="form-horizontal" method="POST" action="/login">
        <div className="form-group">
          <label
            htmlFor="loginEmail"
            className="col-sm-2 control-label">
            User Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="Email"
              name="email"
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="password"
            className="col-sm-2 control-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
