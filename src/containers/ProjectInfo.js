import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class ProjectInfo extends Component {
  render() {
    const { projectInfo } = this.props;
    return (
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
            <td>{ projectInfo.dueDate }</td>
            <td>{ projectInfo.hoursWorked }</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

ProjectInfo.propTypes = {
  projectInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    projectInfo: state.projects.projectInfo
  };
};

export default connect(mapStateToProps)(ProjectInfo);
