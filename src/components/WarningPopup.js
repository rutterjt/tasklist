import React, { useState } from 'react';

// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';

const WarningPopup = ({
  title,
  body,
  open,
  handleCancel,
  handleSuccess,
  cancelLabel,
  successLabel,
}) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1">{body}</Typography>
    </DialogContent>
    <DialogActions>
      <Button autoFocus variant="outlined" onClick={handleCancel}>
        {cancelLabel || 'Cancel'}
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={handleSuccess}
        disableElevation
      >
        {successLabel || 'Confirm'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default WarningPopup;
