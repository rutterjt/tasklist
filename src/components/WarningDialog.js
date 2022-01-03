import React from 'react';

// proptypes
import PropTypes from 'prop-types';

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
 * Opens a WarningDialog modal box component.
 *
 * The WarningDialog gives the user a warning message, and presents two options: cancel and confirm.
 * @param {boolean} props.open - A boolean to control whether or not the WarningDialog renders.
 * @param {string} props.title - The title of the warning.
 * @param {string} props.body - The description body text of the warning.
 * @param {function} props.handleCancel - Callback function to execute if user clicks the cancel button.
 * @param {function}  props.handleConfirm - Callback function to execute if user clicks the confirm button.
 * @param {string} [props.cancelLabel] - (Optional) text for the cancel button.
 * @param {string} [props.confirmLabel] - (Optional) text for the confirm button.
 */
const WarningDialog = ({
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
        {cancelLabel}
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={handleConfirm}
        disableElevation
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

WarningDialog.defaultProps = {
  open: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
};

WarningDialog.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
};

export default WarningDialog;
