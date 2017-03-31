import React, { Component, PropTypes } from "react";

import Navigation from "../containers/Navigation";

require("../styles/app.scss");

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid app">
        <Navigation />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
