import axios from "axios";

import validateInput from "../../../shared/addUserValidation";
import validateInputUpdate from "../../../shared/updateUserValidation";


export function displayUsersList() {
  return dispatch => {
    const request = axios.get("/api/usersList");

    dispatch({
      type: "GET_USERS_LIST",
      payload: request
    })
    .catch(() => {
      console.error("Failed to fetch users");
    });
  };
}

export function userSelected(userId) {
  return {
    type: "USER_SELECTED",
    payload: userId
  };
}

export function editUserInfo() {
  return {
    type: "EDIT_USER_CLICKED"
  };
}

export function assignUserProjects() {
  return {
    type: "ASSIGN_PROJECTS_CLICKED"
  };
}

export function updateUser(data) {
  const { errors, isValid } = validateInputUpdate(data);

  if(!isValid) {
    return {
      type: "UPDATE_INPUT_NOT_VALID",
      payload: errors
    };
  }
  return dispatch => {
    const request = axios.put("/api/usersList/updateUser", data);
    request.then(() => {
      dispatch(displayUsersList());
    });

    dispatch({
      type: "UPDATE_USER",
      payload: request
    })
    .catch(() => {
      console.error("Failed to update user");
    });
  };
}

export function assignProjects(data) {
  return dispatch => {
    const request = axios.put("/api/usersList/assignProjects", data);

    dispatch({
      type: "ASSIGN_PROJECTS",
      payload: request
    })
    .catch(() => {
      console.error("Failed to assign projects");
    });
  };
}

export function deleteUserFromDB(data) {
  return dispatch => {
    const request = axios.delete("/api/usersList/deleteUser", { data });

    dispatch({
      type: "DELETE_USER",
      payload: request
    })
    .catch(() => {
      console.error("Failed to delete user");
    });
  };
}

export function addUser(data) {
  const { errors, isValid } = validateInput(data);

  if(!isValid) {
    return {
      type: "REGISTER_INPUT_NOT_VALID",
      payload: errors
    };
  }
  return dispatch => {
    const request = axios.post("/api/addUser", data);

    dispatch({
      type: "ADD_USER",
      payload: request
    })
    .catch(() => {
      console.error("Failed to add user");
    });
  };
}

export function reset() {
  return {
    type: "RESET_FLASH_STATUS"
  };
}
