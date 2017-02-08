import React, { Component, PropTypes } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

require("../styles/datepicker/react-datepicker.css");
require("../styles/editWorkTime.scss");

class EditWorkTime extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div className="row editWorkTime">
        <h1>{ this.props.projectName }</h1>
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
            defaultValue={0} min="0"
          />
        </div>
        <button className="btn btn-primary update-button">Update</button>
      </div>
    );
  }
}

EditWorkTime.propTypes = {
  projectName: PropTypes.string.isRequired
};

export default EditWorkTime;
