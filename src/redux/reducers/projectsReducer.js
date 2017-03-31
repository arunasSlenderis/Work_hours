const defaultState = {
  projects: [],
  projectsFromDB: [],
  info: {},
  projectInfo: { dueDate: " ", name: " " },
  edit: false,
  editProject: false,
  updatedTimeInfo: [],
  messages: {},
  noProject: true,
  clearID: false,
  projectUpdated: false
};

export default function projectsReducer(state = defaultState, action) {
  switch(action.type) {

  case "CLEAR_ERRORS":{
    return { ...state, messages: {} };
  }
  case "GET_ALL_PROJECTS_PENDING": {
    return { ...state, messages: {}, clearID: false };
  }
  case "GET_ALL_PROJECTS_REJECTED": {
    return { ...state, messages: action.payload.response.data };
  }
  case "GET_ALL_PROJECTS_FULFILLED": {
    return {
      ...state,
      projects: action.payload.data,
      projectInfo: action.payload.data[0]   // defaults to first project
    };
  }

  case "GET_ALL_PROJECTS_FROM_DB_FULFILLED": {
    return {
      ...state,
      projectsFromDB: action.payload.data,
      projectInfo: action.payload.data[0],
      clearID: false,
      projectUpdated: false
    };
  }
  case "GET_ALL_PROJECTS_FROM_DB_PENDING": {
    return { ...state, noProject: true, editProject: false, projectUpdated: false };
  }

  case "PROJECT_SELECTED": {
    return {
      ...state,
      projectInfo: state.projects.find(project => {
        return project._id === action.payload;
      }),
      clearID : false,
      noProject: false,
      edit: false,
    };
  }

  case "MANAGE_PROJECT_SELECTED": {
    return {
      ...state,
      clearID : false,
      noProject: false,
      editProject: false,
      projectInfo: state.projectsFromDB.find(project => {
        return project._id === action.payload;
      }),
    };
  }

  case "EDIT_WORK_TIME_CLICKED": {
    return { ...state, edit: true };
  }

  case "UPDATE_WORK_TIME_FULFILLED": {
    return {
      ...state,
      updatedTimeInfo: action.payload.data,
      projectInfo: {
        ...state.projectInfo,
        hoursWorked: action.payload.data.reduce((acc, time) => {
          return acc + time.hoursWorked;
        }, 0)
      },
      edit: false
    };
  }

  case "ADD_PROJECT_PENDING": {
    return { ...state, messages: {}, clearID: false };
  }

  case "ADD_PROJECT_IS_NOT_VALID": {
    return { ...state, messages: action.payload };
  }

  case "ADD_PROJECT_REJECTED": {
    return { ...state, messages: action.payload.response.data };
  }

  case "ADD_PROJECT_FULFILLED": {
    return { ...state, messages: action.payload.data };
  }

  case "DELETE_PROJECT_FULFILLED": {
    return { ...state, clearID: true, noProject: true };
  }
  case "DELETE_PROJECT_REJECTED": {
    return { ...state, noProject: true };
  }

  case "RESET_PROJECT_FLASH_STATUS": {
    return {
      ...state,
      messages: {
        ...state.messages, success: false, fail: false
      }
    };
  }

  case "EDIT_PROJECT": {
    return { ...state, editProject: true };
  }

  case "UPDATE_PROJECT_FULFILLED": {
    return { ...state, projectUpdated: true };
  }

  case "CLEAR_STATE": {
    return {
      ...state,
      projects: [],
      projectsFromDB: [],
      info: {},
      projectInfo: { dueDate: " ", name: " " },
      updatedTimeInfo: []
    };
  }

  }

  return state;
}
