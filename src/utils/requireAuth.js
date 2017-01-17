import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if(!this.props.isAuthenticated) {
        this.props.errors.message = "You need to login to access this page";
        this.context.router.push("login");
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.context.router.push("/");
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props }/>
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.login.isAuthenticated,
      errors: state.login.errors
    };
  };

  return connect(mapStateToProps)(Authenticate);
}
