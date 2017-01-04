export default function auth(state = {
  user: {
    email: "",
    password: ""
  },
  errors: {},
  isLoading: false
}, action) {
  switch(action.type) {
    case "ON_FORM_CHANGE": {  // eslint-disable-line indent
      return { ...state, user: action.payload };
    }
  }

  return state;
}
