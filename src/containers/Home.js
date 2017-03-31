import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import home from "../images/home.png";

class Home extends Component {
  componentDidMount() {
    if(this.props.error) {
      setTimeout(() => {
        $("#admin-error").fadeOut(300);
      }, 2000);
    }
  }

  render() {
    const { error } = this.props;

    return (
      <div className="row">
        {
          this.props.error ?
          <div id="admin-error" className="alert alert-danger">
            { error }
          </div> :
          ""
        }
        <img className="img-responsive" src={ home } alt="home"></img>
      </div>
    );
  }
}

Home.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    error: state.login.errors.message
  };
};

export default connect(mapStateToProps)(Home);
