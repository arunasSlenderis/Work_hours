import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import { getAllProjects } from "../redux/actions/projectsActions";

class ProjectsList extends Component {

  componentWillMount() {
    this.props.getAllProjects();
  }

  componentDidMount() {
    $(".alert-info").fadeOut(3000);
  }

  render() {
    const { info, projects } = this.props;
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
              projects.map(project => {
                return (
                  <li key={ project._id }>
                    {project.name} {project.hoursWorked}
                  </li>
                );

              })
            }
          </ul>
        </div>
      </div>
    );
  }

}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  info: PropTypes.object
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    info: state.projects.info
  };
};

export default connect(mapStateToProps, { getAllProjects })(ProjectsList);
