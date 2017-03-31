import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import projectsReducer from "./projectsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  login: loginReducer,
  projects: projectsReducer,
  users: usersReducer
});
