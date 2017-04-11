import React, { Component, PropTypes } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";

import { updateWorkTime, getAllProjects } from "../redux/actions/projectsActions";

require("../styles/datepicker/react-datepicker.css");

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
      projectID: projectInfo.project._id,
      workTime: {
        date: this.state.startDate,
        hours: this.state.hours
      }
    }); //userID and projectId
  }

  componentWillUnmount() {
    this.props.getAllProjects(this.props.user.id);
  }

  render() {
    return (
      <div className="row editWorkTime">

        <h1>{ this.props.projectInfo.name }</h1>
        <div className="updateForm">
          <div className="col-xs-4">
            <label style={{"display": "block"}} htmlFor="date">Date:</label>
            <DatePicker
              id="date"
              className="form-control date"
              dateFormat="YYYY-MM-DD"
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              calendarClassName="calendor"
            />
          </div>
          <div className="col-xs-4">
            <label htmlFor="hours">Hours worked:</label>
            <input
              id="hours"
              className="form-control"
              type="number"
              min={0}
              value={ this.state.hours }
              onChange={ this.setTime }
            />
          </div>
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
