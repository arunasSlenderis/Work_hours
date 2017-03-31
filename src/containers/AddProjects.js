import React, { Component } from "react";
import { connect } from "react-redux";


class AddProjects extends Component {
  render() {
    return (
      <div className="row">

      </div>
    );
  }
}

AddProjects.propTypes = {
  // userInfo: PropTypes.object.isRequired
};

// const mapStateToProps = state => {
//   return {
//     // userInfo: state.users.userInfo
//   };
// };

export default connect()(AddProjects);
