import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import {
  getProjectsFromDB,
  manageProjectSelected,
  updateProjectHours,
  deleteProject,
  editProject
} from "../redux/actions/projectsActions";
import ProjectInfo from "./ProjectInfo";
import EditProject from "./EditProject";

import "../styles/manageProjects.scss";

class AllProjectsList extends Component {
  constructor() {
    super();

    this.state = {
      projectID: "",
    };

    this.deletePr = this.deletePr.bind(this);
  }

  componentWillMount() {
    this.props.getProjectsFromDB();
  }

  selected(id, e) {
    this.props.manageProjectSelected(id);
    this.props.updateProjectHours(id);

    this.setState({ projectID: id });

    const selectedTarget = e.target;
    selectedTarget.className += " selected";
    document.querySelectorAll(".selected").forEach(element => {
      if(selectedTarget !== element) {
        element.classList.remove("selected");
      }
    });
  }

  deletePr() {
    this.props.deleteProject(this.state.projectID);
  }

  componentWillUpdate() {
    if(this.props.clearID) {
      this.setState({ projectID: "" });
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }


  render() {
    const { projects, noProject, editProject, edit } = this.props;
    return (
      <div className="all-projects">
        <div className="col-sm-3 col-xs-12 text-center list">
          <div className="row">
            <ul>
              {
                projects.map(project => {
                  if(project !== null) {
                    return (
                      <li
                        key={ project._id }
                        onClick={ this.selected.bind(this, project._id) }
                      >
                        {project.name}
                      </li>
                    );
                  }
                })
              }
            </ul>
          </div>
        </div>

        <div className="col-sm-7 col-sm-offset-1">
          {
            !projects.length &&
            <div className="alert alert-info">
              <p className="text-center">No projects created</p>
            </div>
          }
          <div className="row">
            { projects.length > 0 && <ProjectInfo /> }
          </div>
          <div className="row buttons">
            <button
              disabled={ noProject }
              onClick={ this.deletePr }
              className="btn btn-primary">
              Delete project
            </button>
            <button
              disabled={ noProject }
              onClick={ editProject }
              className="btn btn-primary">
              Edit project
            </button>
          </div>
          <div className="row">
            {
              edit && <EditProject />
            }
          </div>
        </div>
      </div>
    );
  }

}

AllProjectsList.propTypes = {
  getProjectsFromDB: PropTypes.func.isRequired,
  updateProjectHours: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  manageProjectSelected: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  clearID: PropTypes.bool,
  noProject: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projectsFromDB,
    clearID: state.projects.clearID,
    noProject: state.projects.noProject,
    edit: state.projects.editProject
  };
};

export default connect(
  mapStateToProps,
  { getProjectsFromDB, manageProjectSelected, deleteProject, editProject, updateProjectHours }
)(AllProjectsList);
