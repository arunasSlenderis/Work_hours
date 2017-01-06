import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TextField from "../components/TextField";
import { loginRequest } from "../redux/actions/loginActions";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.loginRequest(this.state);
    document.getElementById("password").value = "";
  }

// after props changed
  componentDidUpdate() {
    if(this.props.redirect) this.context.router.push("/");
  }

  render() {
    const { errors, isLoading } = this.props;
    return (
      <form onSubmit={ this.onSubmit } className="form-horizontal">

        {
          errors.message &&
          <div className="alert alert-danger">
            { errors.message }
          </div>
        }

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
  loginRequest: PropTypes.func.isRequired,
  errors: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.login.errors,
    isLoading: state.login.isLoading,
    redirect: state.login.redirect
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loginRequest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
