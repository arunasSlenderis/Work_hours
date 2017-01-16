import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { logout } from "../redux/actions/loginActions";

class Navigation extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.loginData;

    const userLinks = (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className=""><Link to="dashboard">Dashboard</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className=""><Link to="#" onClick={ this.logout.bind(this) }>Logout</Link></li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li className=""><Link to="login">Login</Link></li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-default">
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
            <Link className="navbar-brand" to="/">HOME</Link>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          { isAuthenticated ? userLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  loginData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    loginData: state.login
  };
};

export default connect(mapStateToProps, { logout })(Navigation);
