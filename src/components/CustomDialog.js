import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Dialog } from '@mui/material';

/**
 * Renders a dialog box.
 * @param {boolean} props.open - If true, the dialog renders. If false, it does not.
 * @param {function} props.onClose - Callback function that runs when the user attempts to close the dialog.
 * @param {any} props.children - The dialog contents.
 * @return A dialog box.
 */
const CustomDialog = ({ open, onClose, children }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
    >
      {children}
    </Dialog>
  );
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomDialog;
