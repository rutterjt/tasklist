import React from 'react';

// mui
import { Box, Paper, Typography, Button, Grid } from '@mui/material';

const CustomForm = ({
  onSubmit,
  title,
  onCancel,
  canSubmit = false,
  cancelButton = 'Cancel',
  submitButton = 'Submit',
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

export default CustomForm;
