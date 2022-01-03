import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { TextField } from '@mui/material';

// renders a text field
const TextControl = ({
  name,
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
        id={name}
        label={name}
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
        id={name}
        label={name}
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
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  lines: PropTypes.number.isRequired,
  rest: PropTypes.object,
};

export default TextControl;
