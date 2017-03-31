import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { getProjectsFromDB } from "../redux/actions/projectsActions";
import { assignProjects } from "../redux/actions/usersActions";

import "../styles/assignProjects.scss";

class AssignProjects extends Component {
  componentWillMount() {
    this.props.getProjectsFromDB();
  }

  componentDidUpdate() {
    document.querySelectorAll("ul.assign-projects-list > *").forEach(li => {
      return this.props.userInfo.projects.filter(project => {
        if(project.name === li.innerText) {
          return li.children[0].setAttribute("checked", "true");
        }
      });
    });
  }

  checkToggle(e) {
    if(e.target.tagName === "LI") {
      e.target.children[0].checked = !e.target.children[0].checked;
    }
  }

  assign() {
    let checkedProjects = document.querySelectorAll("ul.assign-projects-list > li input:checked");
    checkedProjects = Array.from(checkedProjects);
    const projectsToAssign = this.props.projects.filter(project => {
      return checkedProjects.find(checkedProject => {
        return checkedProject.parentNode.innerText === project.name;
      });
    });

    this.props.assignProjects({
      projects: Array.from(projectsToAssign), userId: this.props.userInfo._id
    });
  }

  render() {
    return (
      <div className="row">
        <ul className="assign-projects-list">
          {
            this.props.projects.map(project => {
              return (
                <li
                  key={ project._id }
                  onClick={ this.checkToggle.bind(this) }
                >
                  { project.name }
                  <input key={project._id} className="check-project" type="checkbox" />
                </li>

              );
            })
          }
        </ul>
        <button
          className="btn btn-primary"
          onClick={ this.assign.bind(this) }
        >
          Assign
        </button>
      </div>
    );
  }
}

AssignProjects.propTypes = {
  projects: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  getProjectsFromDB: PropTypes.func.isRequired,
  assignProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projectsFromDB,
    userInfo: state.users.userInfo
  };
};

export default connect(mapStateToProps, { getProjectsFromDB, assignProjects })(AssignProjects);
