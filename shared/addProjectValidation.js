import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  const errors = {};
  const regex = new RegExp("^[a-zA-Z0-9 ]+$");
  const spacesOnly = /^\s+$/;

  if(Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  } else {
    if(!regex.test(data.name) || spacesOnly.test(data.name)) {
      errors.name = "Name must contain only letters and numbers";
    }
  }

  if(Validator.isEmpty(data.client)) {
    errors.client = "Client name is required";
  } else {
    if(!regex.test(data.client) || spacesOnly.test(data.client)) {
      errors.client = "Client Name must contain only letters and numbers";
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
