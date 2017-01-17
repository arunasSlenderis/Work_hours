import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class Authenticated extends Component {
    componentWillMount() {
      if(this.props.isAuthenticated) {
        this.props.info.message = "You are already logged in";
        this.context.router.push("dashboard");
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props }/>
      );
    }
  }

  Authenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    info: PropTypes.object
  };

  Authenticated.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.login.isAuthenticated,
      info: state.users.info
    };
  };

  return connect(mapStateToProps)(Authenticated);
}
