const defaultState = {
  users: [],
  userInfo: { projects: []},
  updatedUserinfo: {},
  editUser: false,
  assignProjects: false,
  resMessages: {}
};

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {

  case "CLEAR_ERRORS":{
    return { ...state, resMessages: {} };
  }
  case "GET_USERS_LIST_FULFILLED": {
    // console.log(state.users);
    return {
      ...state,
      users: action.payload.data,
      userInfo: action.payload.data[0]   // defaults to first user
    };
  }
  case "USER_SELECTED": {
    return {
      ...state,
      userInfo: state.users.find(user => {
        return user._id === action.payload;
      }),
      editUser: false,
      assignProjects: false
    };
  }
  case "EDIT_USER_CLICKED": {
    return { ...state, editUser: true, assignProjects: false };
  }
  case "ASSIGN_PROJECTS_CLICKED": {
    return { ...state, assignProjects: true, editUser: false };
  }
  case "UPDATE_INPUT_NOT_VALID": {
    return { ... state, resMessages: action.payload };
  }
  case "UPDATE_USER_REJECTED": {
    return { ... state, resMessages: action.payload.response.data };
  }
  case "UPDATE_USER_PENDING": {
    return { ... state, resMessages: {} };
  }
  case "UPDATE_USER_FULFILLED": {
    return {
      ...state,
      userInfo: action.payload.data,
      editUser: false
    };
  }
  case "ASSIGN_PROJECTS_FULFILLED": {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        projects: action.payload.data.projects
      },
      assignProjects: false
    };
  }
  case "REGISTER_INPUT_NOT_VALID": {
    return {
      ...state,
      resMessages: action.payload
    };
  }
  case "ADD_USER_PENDING": {
    return {
      ...state,
      resMessages: {}
    };
  }
  case "ADD_USER_REJECTED": {
    return {
      ...state,
      resMessages: action.payload.response.data,
    };
  }
  case "ADD_USER_FULFILLED": {
    return {
      ...state,
      resMessages: action.payload.data
    };
  }
  case "RESET_FLASH_STATUS": {
    return {
      ...state,
      resMessages: {
        ...state.resMessages, success: false, fail: false
      }
    };
  }

  }

  return state;
}
