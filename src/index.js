import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";

import routes from "./routes";
import store from "./redux/store";

require("./_bootstrap.scss");
require("bootstrap-sass/assets/javascripts/bootstrap.js");


render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById("app")
);

// for DEV only
if(module.hot) {
  module.hot.accept();
}
