import React, { Component, PropTypes } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";

import { updateWorkTime, getAllProjects } from "../redux/actions/projectsActions";

require("../styles/datepicker/react-datepicker.css");
require("../styles/editWorkTime.scss");

class EditWorkTime extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      hours: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  setTime(e) {
    this.setState({
      hours: Number(e.target.value)
    });
  }

  update() {
    const { user, projectInfo } = this.props;
    this.props.updateWorkTime({
      userID: user.id,
      projectID: projectInfo._id,
      workTime: {
        date: this.state.startDate,
        hours: this.state.hours
      }
    }); //userID and projectId
  }

  componentWillUnmount() {
    this.props.getAllProjects();
  }

  render() {
    return (
      <div className="row editWorkTime">
        <h1>{ this.props.projectInfo.name }</h1>
        <div className="col-xs-4 col-xs-offset-1">
          <label className="block" htmlFor="date">Date:</label>
          <DatePicker
            id="date"
            className="block"
            dateFormat="YYYY-MM-DD"
            selected={ this.state.startDate }
            onChange={ this.handleChange }
          />
        </div>
        <div className="col-xs-4 col-xs-offset-2">
          <label htmlFor="hours">Hours worked:</label>
          <input
            id="hours"
            className="block"
            type="number"
            min={0}
            value={ this.state.hours }
            onChange={ this.setTime }
          />
        </div>
        <button
          className="btn btn-primary update-button"
          onClick={ this.update }
        >
          Update
        </button>
      </div>
    );
  }
}

EditWorkTime.propTypes = {
  updateWorkTime: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  projectInfo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    projectInfo: state.projects.projectInfo,
    user: state.login.user
  };
};

export default connect(mapStateToProps, { updateWorkTime, getAllProjects })(EditWorkTime);
