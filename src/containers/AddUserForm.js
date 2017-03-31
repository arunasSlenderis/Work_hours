import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import isEmpty from "lodash/isEmpty";

import $ from "jquery";

import TextField from "../components/TextField";
import { addUser, reset } from "../redux/actions/usersActions.js";

class AddUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordAgain: "",
      admin: false,
      user: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.check = this.check.bind(this);
  }

  check(e) {
    if(e.target.name === "user") {
      this.setState({ user: true, admin: false });
    } else {
      this.setState({ user: false, admin: true });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addUser(this.state);
  }

  componentDidUpdate() {
    if(this.props.message.text) {
      setTimeout(() => {
        $("#flash").fadeOut(300);
      }, 2000);
      if(this.props.message.success) {
        document.querySelectorAll("#addUserForm Input.form-control").forEach(input => {
          input.value = "";
          if(input.name === "passwordAgain") {
            setTimeout(() => {
              this.props.reset();
              this.setState({name: "",
                lastName: "",
                email: "",
                password: "",
                passwordAgain: ""
              });
            }, 2000);
          }
        });
      }
    }


  }

  render() {
    const { message } = this.props;
    return (
      <form id="addUserForm" onSubmit={ this.onSubmit } className="form-horizontal">

        {
          !isEmpty(message) ?
          <div id="flash" className={ classnames("alert", {
            "alert-success": message.success,
            "alert-danger": message.fail
          }) }>
            { message.text }
          </div> :
          ""
        }

        <TextField
          htmlFor="name"
          label="First name:"
          placeholder="first name"
          name="name"
          onChange={ this.onChange }
          error={ message.name }
        />

        <TextField
          htmlFor="lastName"
          label="Last name:"
          placeholder="last name"
          name="lastName"
          onChange={ this.onChange }
          error={ message.lastName }
        />

        <TextField
          htmlFor="loginEmail"
          label="User Email:"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ this.onChange }
          error={ message.email }
        />

        <TextField
          htmlFor="password"
          label="User Password:"
          type="password"
          name="password"
          onChange={ this.onChange }
          error={ message.password }
        />

        <TextField
          htmlFor="passwordAgain"
          label="Repeat Password:"
          type="password"
          name="passwordAgain"
          onChange={ this.onChange }
          error={ message.passwordAgain }
        />

        <label className="radio-inline">
          <input
            className="radio"
            id="user"
            type="radio"
            name="user"
            checked={ this.state.user }
            onChange={ this.check }
          />
           <b>User</b>
        </label>
        <label className="radio-inline">
          <input
            className="radio"
            id="admin"
            type="radio"
            name="admin"
            checked={ this.state.admin }
            onChange={ this.check }
          />
          <b>Admin</b>
        </label>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            style={{display: "block", marginTop: "15px"}}
          >
            Add user
          </button>
        </div>
      </form>
    );
  }
}

AddUserForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  registerErrors: PropTypes.object,
  message: PropTypes.object
};

const mapStateToProps = state => {
  return {
    registerErrors: state.users.registerErrors,
    message: state.users.resMessages
  };
};


export default connect(mapStateToProps, { addUser, reset })(AddUserForm);
