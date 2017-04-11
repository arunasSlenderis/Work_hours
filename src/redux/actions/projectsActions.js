import axios from "axios";

import validateInput from "../../../shared/addProjectValidation";

export function updateProjectHours(id) {
  return dispatch => {
    const updateHours = axios.put("/api/updateHours", { id });

    dispatch({
      type: "UPDATE_HOURS",
      payload: updateHours
    })
    .catch(() => {
      console.error("Failed to update hours");
    });
  };
}

export function getAllProjects(id) {
  return dispatch => {
    const request = axios.get("/api/dashboard", { params: { id } });

    dispatch({
      type: "GET_ALL_PROJECTS",
      payload: request
    })
    .catch(() => {
      console.error("Failed to get all projects");
    });
  };
}

export function getProjectsFromDB() {
  return dispatch => {
    const request = axios.get("/api/projects");
    dispatch({
      type: "GET_ALL_PROJECTS_FROM_DB",
      payload: request
    })
    .catch(() => {
      console.error("Failed to get all projects from database");
    });
  };
}

export function updateWorkTime(data) {  //userId, projectId
  return dispatch => {
    const request = axios.put("/api/dashboard/updateWorkTime", data);

    dispatch({
      type: "UPDATE_WORK_TIME",
      payload: request
    })
    .catch(() => {
      console.error("Failed to update work time");
    });
  };
}

export function updateHours(data) {  //userId, projectId
  return dispatch => {
    const request = axios.put("/api/dashboard/selected", data);

    dispatch({
      type: "UPDATE_HOURS_SELECTED",
      payload: request
    })
    .catch(() => {
      console.error("Failed to update hours");
    });
  };
}

export function projectSelected(projectId) {
  return {
    type: "PROJECT_SELECTED",
    payload: projectId
  };
}

export function manageProjectSelected(projectId) {
  return {
    type: "MANAGE_PROJECT_SELECTED",
    payload: projectId
  };
}

export function editProjectUser() {
  return {
    type: "EDIT_WORK_TIME_CLICKED"
  };
}

export function addProject(data) {
  const { errors, isValid } = validateInput(data);

  if(!isValid) {
    return {
      type: "ADD_PROJECT_IS_NOT_VALID",
      payload: errors
    };
  }
  return dispatch => {
    const request = axios.post("/api/addProject", data);

    dispatch({
      type: "ADD_PROJECT",
      payload: request
    })
    .catch(() => {
      console.error("Failed to add project");
    });
  };
}

export function resetProjectForm() {
  return { type: "RESET_PROJECT_FLASH_STATUS" };
}

export function deleteProject(id) {
  return dispatch => {
    const request = axios.delete("/api/manageProjects/deleteProject", {
      data: { id }
    });

    request.then(() => {
      dispatch(getProjectsFromDB());
    }, () => {
      console.error("Project deletion ended up in error");
    });

    dispatch({
      type: "DELETE_PROJECT",
      payload: request
    })
    .catch(() => {
      console.error("Failed to delete project");
    });
  };
}

export function editProject() {
  return {
    type: "EDIT_PROJECT"
  };
}

export function updateProject(data) {
  return dispatch => {
    const request = axios.put("/api/manageProjects/updateProject", data);

    request.then(() => {
      dispatch(getProjectsFromDB());
    });

    dispatch({
      type: "UPDATE_PROJECT",
      payload: request
    })
    .catch(() => {
      console.error("Failed to update project");
    });
  };
}
