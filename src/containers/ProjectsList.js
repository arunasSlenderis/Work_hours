import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import { getAllProjects, projectSelected } from "../redux/actions/projectsActions";

require("../styles/projectList.scss");

class ProjectsList extends Component {

  componentWillMount() {
    this.props.getAllProjects();
  }

  componentDidMount() {
    $(".alert-info").fadeOut(3000);
  }

  selected(id) {
    this.props.projectSelected(id);
    // console.log(e.target);
  }

  render() {
    const { info, projects } = this.props;
    return (
      <div className="col-xs-3 text-center projectsList">
        {
          info.message &&
          <div className="alert alert-info">
            { info.message }
          </div>
        }

        <ul>
          {
            projects.map(project => {
              return (
                <li
                  key={ project._id }
                  onClick={ this.selected.bind(this, project._id) }
                >
                  {project.name}
                </li>
              );

            })
          }
        </ul>
      </div>
    );
  }

}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  projectSelected: PropTypes.func.isRequired,
  info: PropTypes.object
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    info: state.projects.info
  };
};

export default connect(
  mapStateToProps,
  { getAllProjects, projectSelected }
)(ProjectsList);
