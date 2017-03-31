import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { displayUsersList, userSelected } from "../redux/actions/usersActions";

class Userslist extends Component {
  componentWillMount() {
    this.props.displayUsersList();
  }

  selected(id) {
    this.props.userSelected(id);
  }

  render() {
    return (
      <div className="col-sm-3 col-xs-11 text-center list">
        <ul>
          {
            this.props.users.map(user => {
              return (
                <li
                  key={ user._id }
                  onClick={ this.selected.bind(this, user._id) }
                >
                  { user.name } { user.lastName }
                </li>
              );

            })
          }
        </ul>
      </div>
    );
  }
}

Userslist.propTypes = {
  users: PropTypes.array.isRequired,
  displayUsersList: PropTypes.func.isRequired,
  userSelected: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps, { displayUsersList, userSelected })(Userslist);
