export default function projectsReducer(state = {
  projects: [],
  info: {}
}, action) {
  switch(action.type) {

  case "GET_ALL_PROJECTS_FULFILLED": {
    return { ...state, projects: action.payload.data };
  }

  }

  return state;
}
