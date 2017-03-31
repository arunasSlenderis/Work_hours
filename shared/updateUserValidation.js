import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  const errors = {};
  // const regex = new RegExp("^[a-zA-Z ]+$");

  if(Validator.isEmpty(data.firstName)) {
    errors.name = "Name is required";
  } else {
    if(!Validator.isAlpha(data.firstName)) {
      errors.name = "Name must contain only letters";
    }
  }

  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  } else {
    if(!Validator.isAlpha(data.lastName)) {
      errors.lastName = "Last name must contain only letters";
    }
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  } else {
    if(!Validator.isEmail(data.email)) {
      errors.email = "E-mail must be valid";
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
