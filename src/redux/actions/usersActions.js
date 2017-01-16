import axios from "axios";

export function getAllUsers() {
  return dispatch => {
    const request = axios.get("/api/dashboard");

    dispatch({
      type: "GET_ALL_USERS",
      payload: request
    })
    .catch(() => {
      console.error("Failed to get all users");
    });
  };
}
