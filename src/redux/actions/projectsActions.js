import axios from "axios";

export function getAllProjects() {
  return dispatch => {
    const request = axios.get("/api/dashboard");

    dispatch({
      type: "GET_ALL_PROJECTS",
      payload: request
    })
    .catch(() => {
      console.error("Failed to get all projects");
    });
  };
}

export function projectSelected(projectId) {
  return {
    type: "PROJECT_SELECTED",
    payload: projectId
  };
}

export function editProjectUser() {
  return {
    type: "EDIT_WORK_TIME_CLICKED"
  };
}
