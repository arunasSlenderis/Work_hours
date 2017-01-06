export default function loginReducer(state = {
  redirect: false,
  errors: {},
  isLoading: false
}, action) {
  switch(action.type) {

  case "LOGIN_REQUEST_PENDING": {
    return { ...state, isLoading: true };
  }
  case "LOGIN_REQUEST_FULFILLED": {
    return { ...state, isLoading: false, errors: {}, redirect: true };
  }
  case "LOGIN_REQUEST_REJECTED": {
    return {
      ...state,
      errors: action.payload.response.data,
      isLoading: false,
      redirect: false
    };
  }
  case "INPUT_NOT_VALID": {
    return {
      ...state,
      errors: action.payload,
      isLoading: false, 
      redirect: false
    };
  }

  }

  return state;
}
