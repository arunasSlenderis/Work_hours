import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";  //for async operations
import promise from "redux-promise-middleware";
// import logger from "redux-logger"; // for DEV

import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(promise(), thunk) //logger()
    //window.devToolsExtension ? window.devToolsExtension() : f => f   //dev only
  )
);

export default store;
