export default function usersReducer(state = {
  users: [],
  info: {}
}, action) {
  switch(action.type) {

  case "GET_ALL_USERS_FULFILLED": {
    return { ...state, users: action.payload.data };
  }

  }

  return state;
}
