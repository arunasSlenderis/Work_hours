import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import TextField from "../components/TextField";
import { updateUser } from "../redux/actions/usersActions";

class EditUser extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      checkedAdmin: false,
      checkedUser: false
    };

    this.onChange = this.onChange.bind(this);
    this.check = this.check.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      firstName: this.props.userInfo.name,
      lastName: this.props.userInfo.lastName,
      email: this.props.userInfo.email,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateUser({ userId: this.props.userInfo._id, ...this.state });
  }

  check(e) {
    if(e.target.name === "user") {
      this.setState({ checkedUser: true, checkedAdmin: false });
    } else {
      this.setState({ checkedUser: false, checkedAdmin: true });
    }
  }

  componentDidMount() {
    if(this.props.userInfo.userType === "user") {
      this.setState({ checkedUser: true, checkedAdmin: false });
    } else {
      this.setState({ checkedUser: false, checkedAdmin: true });
    }
  }

  render() {
    const { message } = this.props;
    return (
      <div className="row">
        <form id="editForm" onSubmit={ this.onSubmit }>
          <TextField
            htmlFor="firstName"
            label="First name:"
            name="firstName"
            placeholder={ this.props.userInfo.name }
            value={ this.state.firstName }
            onChange={ this.onChange }
            error={ message.name }
          />
          <TextField
            htmlFor="lastName"
            label="Last name:"
            name="lastName"
            placeholder={ this.props.userInfo.lastName }
            value={ this.state.lastName }
            onChange={ this.onChange }
            error={ message.lastName }
          />
          <TextField
            type="email"
            htmlFor="email"
            label="E-mail:"
            name="email"
            placeholder={ this.props.userInfo.email }
            value={ this.state.email }
            onChange={ this.onChange }
            error={ message.email }
          />
        <label className="radio-inline">
          <input
            className="radio"
            id="user"
            type="radio"
            name="user"
            checked={ this.state.checkedUser }
            onClick={ this.check }
          />
           <b>User</b>
        </label>
        <label className="radio-inline">
          <input
            className="radio"
            id="admin"
            type="radio"
            name="admin"
            checked={ this.state.checkedAdmin }
            onClick={ this.check }
          />
          <b>Admin</b>
        </label>

        <button
          type="submit"
          name="update"
          className="btn btn-primary"
          style={{display: "block", marginTop: "15px"}}
        >
          Update
        </button>

        </form>
      </div>
    );
  }
}

EditUser.propTypes = {
  userInfo: PropTypes.object.isRequired,
  message: PropTypes.object,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    userInfo: state.users.userInfo,
    message: state.users.resMessages
  };
};

export default connect(mapStateToProps, { updateUser })(EditUser);
