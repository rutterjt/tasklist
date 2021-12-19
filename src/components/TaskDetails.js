import React, { useState } from 'react';

import {
  Button,
  Box,
  Typography,
  Grid,
  // Chip,
} from '@mui/material';

// components
import PriorityIcon from './PriorityIcon';
import DateChip from './DateChip';
import WarningPopup from './WarningPopup';
import TaskUpdateForm from './TaskUpdateForm';
import CustomDialog from './CustomDialog';

// store
import { useStore } from '../store/useStore';

export const DetailsGrid = ({ children }) => (
  <Grid container justifyContent="space-between">
    {children}
  </Grid>
);

export const ButtonGrid = ({ children }) => (
  <Grid container sx={{ mt: '1rem' }} justifyContent="flex-end" spacing={2}>
    {children}
  </Grid>
);

const TaskDetailsBox = ({ name, description, due, priority, openEditor }) => (
  <Box sx={{ p: '1.5rem' }}>
    <Typography variant="h6" component="h3" sx={{ mb: '1.5rem' }}>
      {name}
    </Typography>
    {description && (
      <Typography variant="body1" sx={{ mb: '1rem' }}>
        {description}
      </Typography>
    )}
    <DetailsGrid>
      <Grid item>
        <DateChip date={due} />
      </Grid>
      <Grid item>
        <PriorityIcon priority={priority} />
      </Grid>
    </DetailsGrid>
    <ButtonGrid>
      <Grid item>
        <Button disableRipple variant="outlined" onClick={openEditor}>
          Update
        </Button>
      </Grid>
    </ButtonGrid>
  </Box>
);

const TaskDetails = ({ open, onClose, id }) => {
  const { list } = useStore();
  // get all details of currently-opened task
  const task = list.find((task) => task.id === id) || {};

  const [warningOpen, setWarningOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  // closes the TaskDetails dialog
  const close = () => {
    setWarningOpen(false);
    setEditing(false);
    onClose();
  };

  // checks if editor is open: if yes, opens a WarningPopup, if not, closes TaskDetails
  const handleClose = () => {
    if (editing) {
      setWarningOpen(true);
    } else {
      close();
    }
  };

  return (
    <CustomDialog onClose={handleClose} open={open}>
      {editing ? (
        <TaskUpdateForm
          task={task}
          handleClose={handleClose}
          handleSave={close}
        />
      ) : (
        <TaskDetailsBox {...task} openEditor={() => setEditing(true)} />
      )}
      <WarningPopup
        open={warningOpen}
        title="Discard changes"
        body="Are you sure you want to discard all your changes? This can't be undone."
        cancelLabel="Keep Editing"
        successLabel="Discard"
        handleCancel={() => setWarningOpen(false)}
        handleSuccess={close}
      />
    </CustomDialog>
  );
};

export default TaskDetails;
