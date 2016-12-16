import React from "react";  //eslint-disable-line no-unused-vars
import { render } from "react-dom";

import App from "./components/App"; //eslint-disable-line no-unused-vars

require("./_bootstrap.scss");

render(<App />, document.getElementById("app"));

// for DEV only
if(module.hot) {
  module.hot.accept();
}
