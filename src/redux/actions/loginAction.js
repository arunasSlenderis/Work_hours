import axios from "axios";

export function loginRequest(loginData) {
  return dispatch => { //eslint-disable-line no-unused-vars
    return axios.post("/api/login", loginData);
  };
}
