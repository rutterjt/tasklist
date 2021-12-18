import React from 'react';

// mui
import { Dialog } from '@mui/material';

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

export default CustomDialog;
