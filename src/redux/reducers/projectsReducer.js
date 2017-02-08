export default function projectsReducer(state = {
  projects: [],
  info: {},
  projectInfo: { dueDate: " ", name: " " },
  edit: false
}, action) {
  switch(action.type) {

  case "GET_ALL_PROJECTS_FULFILLED": {
    return {
      ...state,
      projects: action.payload.data,
      projectInfo: action.payload.data[0]   // defaults to first project
    };
  }

  case "PROJECT_SELECTED": {
    return {
      ...state,
      projectInfo: state.projects.find(project => {
        return project._id === action.payload;
      }),
      edit: false
    };
  }

  case "EDIT_WORK_TIME_CLICKED": {
    return { ...state, edit: true };
  }

  }

  return state;
}
