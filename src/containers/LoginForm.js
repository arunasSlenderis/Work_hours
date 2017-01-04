import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import TextField from "../components/TextField";
import validateInput from "../../shared/loginValidation";
import { loginRequest } from "../redux/actions/loginAction";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.loginRequest(this.state).then(
        () => this.context.router.push("/"),
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    // if(Object.getOwnPropertyNames(this.props.loginRequest).length === 0) {
    //   return(<div></div>);
    // }
    return (
      <form onSubmit={ this.onSubmit } className="form-horizontal">
        <TextField
          htmlFor="loginEmail"
          label="User Email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ this.onChange }
          error={ errors.email }
        />
        <TextField
          htmlFor="password"
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={ this.onChange }
          error={ errors.password }
        />
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-default"
            disabled={ isLoading }
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginRequest: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { loginRequest })(LoginForm);
