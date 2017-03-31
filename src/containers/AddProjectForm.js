import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import classnames from "classnames";
import $ from "jquery";

import TextField from "../components/TextField";
import { addProject, resetProjectForm } from "../redux/actions/projectsActions.js";

class AddProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      name: "",
      client: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
    this.props.addProject(this.state);
  }

  componentDidUpdate() {
    if(this.props.message.text) {
      setTimeout(() => {
        $("#flash").fadeOut(300);
      }, 2000);
      if(this.props.message.success) {
        document.querySelectorAll("#addProjectForm Input.form-control").forEach(input => {
          input.value = "";
          if(input.name === "client") {
            setTimeout(() => {
              this.props.resetProjectForm();
              this.setState({ name: "", client: "" });
            }, 2000);
          }
        });
      }
    }


  }


  render() {
    const { message } = this.props;

    return (
      <form id="addProjectForm" onSubmit={ this.onSubmit } className="form-horizontal">

        {
          !isEmpty(message) || message.success || message.fail ?
          <div id="flash" className={ classnames("alert", {
            "alert-success": message.success,
            "alert-danger": message.fail
          }) }>
            { message.text }
          </div> :
          ""
        }

        <TextField
          htmlFor="name"
          label="Project name:"
          placeholder="project name"
          name="name"
          onChange={ this.onChange }
          error={ message.name }
        />

        <TextField
          htmlFor="client"
          label="Client:"
          placeholder="client name"
          name="client"
          onChange={ this.onChange }
          error={ message.client }
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

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            style={{display: "block", marginTop: "15px"}}
          >
            Add project
          </button>
        </div>
      </form>
    );
  }
}

AddProjectForm.propTypes = {
  addProject: PropTypes.func.isRequired,
  message: PropTypes.object,
  resetProjectForm: PropTypes.func
};

const mapStateToProps = state => {
  return {
    message: state.projects.messages
  };
};


export default connect(mapStateToProps, { addProject, resetProjectForm })(AddProjectForm);
