import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";  //for async operations
import promise from "redux-promise-middleware";
import logger from "redux-logger"; // for DEV

import rootReducer from "./reducers/rootReducer";

let store = createStore(rootReducer, applyMiddleware(
  promise(), thunk, logger()
));

export default store;
