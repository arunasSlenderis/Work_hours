import React from "react";  //eslint-disable-line no-unused-vars
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";  //eslint-disable-line no-unused-vars

import routes from "./routes";

require("./_bootstrap.scss");
require("bootstrap-sass/assets/javascripts/bootstrap.js");

render(
  <Router
    history={ browserHistory }
    routes={ routes }
  />,
document.getElementById("app")
);

// for DEV only
if(module.hot) {
  module.hot.accept();
}
