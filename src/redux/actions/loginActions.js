import axios from "axios";
import jwt from "jsonwebtoken";

import validateInput from "../../../shared/loginValidation";
import setAuthToken from "../../utils/setAuthToken";

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

    // saving token to local storage
    request.then(res => {
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });

    dispatch({
      type: "LOGIN_REQUEST",
      payload: request
    })
    .catch(() => {
      console.error("Login failed");
    });
  };
}

export function setCurrentUser(user) {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  };
}
