import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import { getAllUsers } from "../redux/actions/usersActions";

class UserList extends Component {

  componentWillMount() {
    this.props.getAllUsers();
  }

  componentDidMount() {
    $(".alert-info").fadeOut(3000);
  }

  render() {
    const { info, users } = this.props;
    return (
      <div className="row">
        {
          info.message &&
          <div className="alert alert-info">
            { info.message }
          </div>
        }
        <div className="col-md-3">
          <ul>
            {
              users.map(user => {
                return <li key={ user._id }>{user.name} {user.lastName}</li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }

}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  info: PropTypes.object
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    info: state.users.info
  };
};

export default connect(mapStateToProps, { getAllUsers })(UserList);
