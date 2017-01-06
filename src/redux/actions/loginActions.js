import axios from "axios";

import validateInput from "../../../shared/loginValidation";

export function loginRequest(loginData) {
  const { errors, isValid } = validateInput(loginData);

  if(!isValid) {
    return {
      type: "INPUT_NOT_VALID",
      payload: errors
    };
  }

  return dispatch => {
    const request = axios.post("/api/login", loginData);
    dispatch({
      type: "LOGIN_REQUEST",
      payload: request
    })
    .catch(() => {
      console.error("Login failed");
    });
  };
}
