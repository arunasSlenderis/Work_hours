import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  const errors = {};

  if(Validator.isEmpty(data.name)) {
    errors.name = "First name is required";
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if(Validator.isEmpty(data.passwordAgain)) {
    errors.passwordAgain = "Password confirmation is required";
  }
  if(!Validator.equals(data.password, data.passwordAgain)) {
    errors.passwordAgain = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
