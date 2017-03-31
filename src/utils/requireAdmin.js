import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class IsAdmin extends Component {
    componentWillMount() {
      if(this.props.userType !== "admin") {
        this.props.errors.message = "You need to be admin to access this page";
        this.context.router.push("/");
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props }/>
      );
    }
  }

  IsAdmin.propTypes = {
    userType: PropTypes.string,
    errors: PropTypes.object
  };

  IsAdmin.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return {
      userType: state.login.user.userType,
      errors: state.login.errors
    };
  };

  return connect(mapStateToProps)(IsAdmin);
}
