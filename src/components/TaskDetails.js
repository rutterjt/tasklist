import React, { useState } from 'react';

import { Button, Box, Typography, Grid } from '@mui/material';

// components
import PriorityIcon from './PriorityIcon';
import DateChip from './DateChip';
import WarningDialog from './WarningDialog';
import TaskUpdateForm from './forms/TaskUpdateForm';
import CustomDialog from './CustomDialog';
import LabelDisplay from './LabelDisplay';

// store
import { useStore } from '../store/useStore';

export const DetailsGrid = ({ children }) => (
  <Grid container justifyContent="space-between">
    {children}
  </Grid>
);

export const ButtonGrid = ({ children }) => (
  <Grid container sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
    {children}
  </Grid>
);

const TaskDetailsBox = ({
  name,
  description,
  due,
  priority,
  openEditor,
  label,
}) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
      {name}
    </Typography>
    {description && (
      <Typography variant="body1" sx={{ mb: 4 }}>
        {description}
      </Typography>
    )}
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <DateChip date={due} />
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          {label && (
            <Grid item>
              <LabelDisplay label={label} />
            </Grid>
          )}
          <Grid item>
            <PriorityIcon priority={priority} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <ButtonGrid>
      <Grid item>
        <Button variant="outlined" onClick={openEditor}>
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

  // checks if editor is open: if yes, opens a WarningDialog, if not, closes TaskDetails
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
      <WarningDialog
        open={warningOpen}
        title="Discard changes"
        body="Are you sure you want to discard all your changes? This can't be undone."
        cancelLabel="Keep Editing"
        confirmLabel="Discard"
        handleCancel={() => setWarningOpen(false)}
        handleConfirm={close}
      />
    </CustomDialog>
  );
};

export default TaskDetails;
