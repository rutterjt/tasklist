import React from 'react';

// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';

/**
 * Opens a WarningPopup modal box component.
 *
 * The WarningPopup gives the user a warning message, and presents two options: cancel and confirm.
 * @param {boolean} open - A boolean to control whether or not the WarningPopup renders.
 * @param {string} title - The title of the warning.
 * @param {string} body - The description body text of the warning.
 * @param {function} handleCancel - Callback function to execute if user clicks the cancel button.
 * @param {function}  handleConfirm - Callback function to execute if user clicks the confirm button.
 * @param {string} [cancelLabel] - (Optional) text for the cancel button.
 * @param {string} [confirmLabel] - (Optional) text for the confirm button.
 */
const WarningPopup = ({
  title,
  body,
  open,
  handleCancel,
  handleConfirm,
  cancelLabel,
  confirmLabel,
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
        onClick={handleConfirm}
        disableElevation
      >
        {confirmLabel || 'Confirm'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default WarningPopup;
