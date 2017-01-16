import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import jwtDecode from "jwt-Decode";

import routes from "./routes";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/loginActions";

require("./_bootstrap.scss");
require("bootstrap-sass/assets/javascripts/bootstrap.js");

// after login even if page reloaded, user date will still be in redux store
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

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
