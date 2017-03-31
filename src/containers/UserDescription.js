import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import alertify from "alertify.js";

import EditUser from "./EditUser";
import AssignProjects from "./AssignProjects";
import {
  editUserInfo,
  assignUserProjects,
  deleteUserFromDB,
  displayUsersList } from "../redux/actions/usersActions.js";

class UserDescription extends Component {
  deleteAlert() {
    const { name, lastName, _id } = this.props.userInfo;

    alertify.confirm(`Delete user: ${name} ${lastName}?`, (e) => {
      this.props.deleteUserFromDB({ userId: _id });
      if(e) {
        alertify.success(`User ${name} ${lastName} deleted`);
        this.props.displayUsersList();
      }
    });
  }

  render() {
    const {
      userInfo,
      editUserInfo,
      editUser,
      assignProjects,
      assignUserProjects,
    } = this.props;
    return (
      <div className="col-sm-8 user-description">
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ userInfo.name }</td>
                <td>{ userInfo.lastName }</td>
                <td>{ userInfo.email }</td>
                <td>{ userInfo.userType }</td>
              </tr>
            </tbody>
          </table>
          <hr style={{"border": "2px solid black"}}/>
          <label htmlFor="projectList">Assigned projects:</label>

          <select id="projectList">
            {
              userInfo.projects.map(project => {
                return (
                  <option
                    key={ project._id }
                  >
                    { project.name }
                  </option>
                );
              })
            }

          </select>
        </div>
        <div className="row user-list-btn">
          <button
            className="btn btn-primary edit-button-user-list"
            onClick={ editUserInfo }
          >
            Edit User
          </button>
          <button
            className="btn btn-primary assign-project-button"
            onClick={ assignUserProjects }
          >
            Assign projects
          </button>
          <button
            className="btn btn-primary delete-user-button"
            onClick={ this.deleteAlert.bind(this) }
          >
            Delete user
          </button>
        </div>
        { editUser ? <EditUser /> : ""}
        { assignProjects ? <AssignProjects /> : "" }
      </div>
    );
  }
}

UserDescription.propTypes = {
  userInfo: PropTypes.object.isRequired,
  editUserInfo: PropTypes.func.isRequired,
  deleteUserFromDB: PropTypes.func.isRequired,
  displayUsersList: PropTypes.func.isRequired,
  assignProjects: PropTypes.bool.isRequired,
  assignUserProjects: PropTypes.func.isRequired,
  editUser: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    userInfo: state.users.userInfo,
    editUser: state.users.editUser,
    assignProjects: state.users.assignProjects,
  };
};

export default connect(
  mapStateToProps,
  { editUserInfo, assignUserProjects, deleteUserFromDB, displayUsersList }
)(UserDescription);
