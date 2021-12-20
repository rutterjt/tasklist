import React from 'react';

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
      />
    );
  }
};

export default TextControl;
