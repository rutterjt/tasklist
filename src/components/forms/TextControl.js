import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { TextField } from '@mui/material';

/**
 * Renders a form text input.
 * @param {string} label - The label of the form.
 * @param {string} value - The input's value.
 * @param {function} onChange - Code to run when the input value changes (should include code to update the value state).
 * @param {boolean} required - Boolean for whether the form input is required.
 * @param {boolean} autofocus - Boolean for whether the form input should be autofocused.
 * @param {number} lines - The number of lines the text field should use. If lines > 1, the component will render a <textarea>. If lines = 1, the component will render an <input type="text">
 * @param {object} rest - Additional options that will be directly passed to the MUI <TextField> component.
 *
 */
const TextControl = ({
  label,
  value,
  onChange,
  required,
  autoFocus,
  lines = 1,
  ...rest
}) => {
  if (lines > 1) {
    return (
      <TextField
        id={label}
        label={label}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
        fullWidth
        variant="outlined"
        multiline
        minRows={lines}
        maxRows={lines}
        sx={{ mb: 2 }}
        {...rest}
      />
    );
  } else {
    return (
      <TextField
        id={label}
        label={label}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        {...rest}
      />
    );
  }
};

TextControl.defaultProps = {
  lines: 1,
  value: '',
  required: false,
  autoFocus: false,
};

TextControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  lines: PropTypes.number.isRequired,
  rest: PropTypes.object,
};

export default TextControl;
