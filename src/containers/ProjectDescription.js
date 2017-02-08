import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import EditWorkTime from "../components/EditWorkTime";
import { editProjectUser } from "../redux/actions/projectsActions";

require("../styles/projectDescription.scss");

class ProjectDescription extends Component {
  editWorkTime() {
    this.props.editProjectUser();
  }

  render() {
    const { projectInfo, edit } = this.props;
    return (
      <div className="col-xs-8">
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
              <tr>
                <td>{ projectInfo.name }</td>
                <td>{ projectInfo.client }</td>
                <td>{ projectInfo.dueDate.substr(0, 10) }</td>
                <td>{ projectInfo.hoursWorked }</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-primary edit-button"
            onClick={ this.editWorkTime.bind(this) }
          >
            Edit work time
          </button>
        </div>
        { edit ? <EditWorkTime projectName={ projectInfo.name } /> : "" }
      </div>
    );
  }
}

ProjectDescription.propTypes = {
  projectInfo: PropTypes.object.isRequired,
  editProjectUser: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    projectInfo: state.projects.projectInfo,
    edit: state.projects.edit
  };
};

export default connect(mapStateToProps, { editProjectUser })(ProjectDescription);
