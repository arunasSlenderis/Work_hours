import React, { Component, PropTypes } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";

import TextField from "../components/TextField";
import { updateProject } from "../redux/actions/projectsActions";

class EditProject extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      projectName: "",
      client: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateProject({ projectID: this.props.projectInfo._id, ...this.state });
  }

  componentWillMount() {
    const { name, client } = this.props.projectInfo;
    this.setState({ projectName: name, client });
  }

  componentWillUnmount() {
    if(!this.props.projectUpdated) {
      document.querySelectorAll(".selected").forEach(selected => {
        selected.classList.remove("selected");
      });
    }
  }

  render() {
    return(
      <form className="form-horizontal" onSubmit={ this.onSubmit }>
        <TextField
          htmlFor="projectName"
          label="Project Name:"
          placeholder="project name"
          name="projectName"
          value={ this.state.projectName }
          onChange={ this.onChange }
        />
        <TextField
          htmlFor="client"
          label="Client Name:"
          placeholder="client name"
          name="client"
          value={ this.state.client }
          onChange={ this.onChange }
        />
      <div className="form-group">
        <label style={{"display": "block"}} htmlFor="dueDate">Due date:</label>
        <DatePicker
          id="dueDate"
          style={{"display": "block"}}
          className="form-control"
          dateFormat="YYYY-MM-DD"
          minDate={ moment() }
          selected={ this.state.startDate }
          onChange={ this.handleChange }
        />
      </div>
      <button className="btn btn-primary" type="submit">Update</button>

      </form>
    );
  }
}

EditProject.propTypes = {
  projectInfo: PropTypes.object.isRequired,
  updateProject: PropTypes.func.isRequired,
  projectUpdated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    projectInfo: state.projects.projectInfo,
    projectUpdated: state.projects.projectUpdated
  };
};

export default connect(mapStateToProps, { updateProject, })(EditProject);
