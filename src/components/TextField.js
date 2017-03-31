import React, { PropTypes } from "react";
import classnames from "classnames";

const TextField = ({
  htmlFor, label, type, placeholder, name, onChange, error, defaultValue, value
}) => {
  return (
    <div className={ classnames("form-group", { "has-error": error }) }>
      <label
        htmlFor={ htmlFor }
        className="control-label">
        { label }
      </label>
      <input
        type={ type }
        className="form-control textField"
        id={ htmlFor }
        placeholder={ placeholder }
        name={ name }
        onChange={ onChange }
        defaultValue={ defaultValue }
        value={ value }
      />
    { error && <span className="help-block">{ error }</span> }
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
