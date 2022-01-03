import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Box, Paper, Typography, Button, Grid } from '@mui/material';

const CustomForm = ({
  onSubmit,
  title,
  onCancel,
  canSubmit,
  cancelButton,
  submitButton,
  children,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)}>
      <Paper sx={{ p: 2 }}>
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
        <Grid container sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onCancel}>
              {cancelButton}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              disabled={!canSubmit}
              type="submit"
              color="success"
            >
              {submitButton}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

CustomForm.defaultProps = {
  canSubmit: false,
  cancelButton: 'Cancel',
  submitButton: 'Submit',
};

CustomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  cancelButton: PropTypes.string.isRequired,
  submitButton: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomForm;
