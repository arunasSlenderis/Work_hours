import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import projectsReducer from "./projectsReducer";

export default combineReducers({
  login: loginReducer,
  projects: projectsReducer
});
