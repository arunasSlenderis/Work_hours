import React, { Component } from "react"; //eslint-disable-line no-unused-vars

import LoginForm from "./LoginForm";  //eslint-disable-line no-unused-vars
import Navigation from "./Navigation";  //eslint-disable-line no-unused-vars

require("../styles/app.scss");

export default class App extends Component {
  render() {
    return (
      <div className="container">
          <Navigation />
          <LoginForm />
      </div>
    );
  }
}
