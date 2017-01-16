import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { getAllUsers } from "../redux/actions/usersActions";

class UserList extends Component {

  componentWillMount() {
    this.props.getAllUsers();
  }

  render() {
    return (
      <ul>
        {
          this.props.users.map(user => {
            return <li key={ user._id }>{user.name} {user.lastName}</li>;
          })
        }
      </ul>
    );
  }

}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps, { getAllUsers })(UserList);
