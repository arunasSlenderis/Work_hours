import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { logout, clearState, clearErrors } from "../redux/actions/loginActions";

class Navigation extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.clearState();
  }

  addActiveClass(e) {
    this.props.clearErrors();
    // removes class form links
    e.target.parentNode.parentNode.childNodes.forEach(li => {
      return li.childNodes[0].className = "";
    });
    //removes active class from Home link
    document.getElementById("home").className = "navbar-brand";

    e.target.className = "activeHighlight";
    document.activeElement.blur();
  }

  removeLinkClass(e) {
    document.getElementById("mainMenu").childNodes.forEach(li => {
      return li.childNodes[0].className = "";
    });

    // add active class to home link
    e.target.className = "navbar-brand activeHighlight";
    document.activeElement.blur();
  }

  render() {
    const { isAuthenticated, user } = this.props.loginData;

    const userLinks = (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul id="mainMenu" className="nav navbar-nav">
          <li>
            <Link to="dashboard" onClick={ this.addActiveClass.bind(this) }>
              Dashboard
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="#" onClick={ this.logout.bind(this) }>Logout</Link></li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="login" onClick={ this.addActiveClass.bind(this) }>
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    const adminLinks = (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul id="mainMenu" className="nav navbar-nav">
          <li>
            <Link to="dashboard" onClick={ this.addActiveClass.bind(this) }>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="addUser" onClick={ this.addActiveClass.bind(this) }>
              Add User
            </Link>
          </li>
          <li>
            <Link to="addProject" onClick={ this.addActiveClass.bind(this) }>
              Add Project
            </Link>
          </li>
          <li>
            <Link
              to="userList"
              onClick={ this.addActiveClass.bind(this) }
            >
              Users List
            </Link>
          </li>
          {
            this.props.projects.length > 0 &&
            <li>
              <Link
                to="manageProjects"
                onClick={ this.addActiveClass.bind(this) }
              >
                Manage Projects
              </Link>
            </li>
          }

        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="#" onClick={ this.logout.bind(this) }>Logout</Link></li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link
              id="home"
              onClick={ this.removeLinkClass.bind(this) }
              className="navbar-brand" to="/"
            >
              HOME
            </Link>
          </div>
          {/* If user is not admin shows only dashboard link */}
          {
            isAuthenticated && user.userType === "admin" ?
            adminLinks : isAuthenticated ?
            userLinks : guestLinks
          }
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  loginData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  projects: PropTypes.array
};

const mapStateToProps = state => {
  return {
    loginData: state.login,
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps, {
  logout,
  clearState,
  clearErrors
})(Navigation);
