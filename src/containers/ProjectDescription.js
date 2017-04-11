import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import EditWorkTime from "./EditWorkTime";
import { editProjectUser, updateWorkTime } from "../redux/actions/projectsActions";

require("../styles/projectDescription.scss");

class ProjectDescription extends Component {
  editWorkTime() {
    this.props.editProjectUser();
  }

  render() {
    const { projectInfo, edit, message } = this.props;
    const { project } = projectInfo;
    return (
      <div className="col-sm-8">
        {
          message.message ?
          <div className="alert alert-info">
            { message.message }
          </div> :
          ""
        }
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Project name</th>
                <th>Client</th>
                <th>Due date</th>
                <th>Hours worked</th>
              </tr>
            </thead>
            <tbody>
              {
                project ?
                <tr>
                  <td>{ project.name }</td>
                  <td>{ project.client }</td>
                  <td>{ project.dueDate }</td>
                  <td>{ projectInfo.additionalData }</td>
                </tr> :
                ""
              }

            </tbody>
          </table>
          <button
            className="btn btn-primary edit-button"
            onClick={ this.editWorkTime.bind(this) }
            disabled={ message.message }
          >
            Edit work time
          </button>
        </div>
        { edit ? <EditWorkTime /> : "" }
      </div>
    );
  }
}

ProjectDescription.propTypes = {
  projectInfo: PropTypes.object.isRequired,
  editProjectUser: PropTypes.func.isRequired,
  updateWorkTime: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  message: PropTypes.object
};

const mapStateToProps = state => {
  return {
    projectInfo: state.projects.projectInfo,
    edit: state.projects.edit,
    message: state.projects.messages
  };
};

export default connect(mapStateToProps, { editProjectUser, updateWorkTime })(ProjectDescription);
