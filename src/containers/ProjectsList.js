import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import { getAllProjects, projectSelected } from "../redux/actions/projectsActions";

class ProjectsList extends Component {

  componentWillMount() {
    this.props.getAllProjects(this.props.user.id);
  }

  componentDidMount() {
    $(".alert-info").fadeOut(3000);
  }

  selected(id) {
    this.props.projectSelected(id);
  }

  render() {
    const { info, projects } = this.props;
    return (
      <div className="col-sm-3 col-xs-11 text-center list">
        {
          info.message &&
          <div className="alert alert-info">
            { info.message }
          </div>
        }

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
    );
  }

}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  projectSelected: PropTypes.func.isRequired,
  info: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    info: state.projects.info,
    user: state.login.user
  };
};

export default connect(
  mapStateToProps,
  { getAllProjects, projectSelected }
)(ProjectsList);
