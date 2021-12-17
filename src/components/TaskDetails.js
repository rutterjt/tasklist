import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
} from '@mui/material';

// components
import PriorityControl from './PriorityControl';
import DueDateControl from './DueDateControl';
import TextControl from './TextControl';
import PriorityIcon from './PriorityIcon';
import DateChip from './DateChip';

// utils
import { displayDate } from '../utils/date';

// store
import { useStore } from '../store/context';
import { UPDATE_TASK } from '../store/actions';

const WarningDialog = ({ open, handleCancel, handleDiscard }) => (
  <Dialog open={open}>
    <DialogTitle>Discard Changes?</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1">
        Any changes you've made will not be saved.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button autoFocus variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
      <Button color="error" variant="contained" onClick={handleDiscard}>
        Discard
      </Button>
    </DialogActions>
  </Dialog>
);

const DetailsGrid = ({ children }) => (
  <Grid container justifyContent="space-between">
    {children}
  </Grid>
);

const ButtonGrid = ({ children }) => (
  <Grid container sx={{ mt: '1rem' }} justifyContent="flex-end" spacing={2}>
    {children}
  </Grid>
);

const TaskDetails = ({ open, onClose, id }) => {
  const { list, dispatch } = useStore();

  const task = list.find((task) => task.id === id) || {};

  const { name, description, due, priority, label } = task;

  const [data, setData] = useState({ ...task });

  const [changeWarning, setChangeWarning] = useState(false);

  const [editing, setEditing] = useState(false);

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newPriority, setNewPriority] = useState(priority);
  const [newDate, setNewDate] = useState(due);
  const [newLabel, setNewLabel] = useState(label);

  const update = (name) => (value) =>
    setData((oldData) => {
      let newData = { ...oldData };
      newData.name = value;
      return newData;
    });

  const values = [
    { new: newName, old: name },
    { new: newDescription, old: description },
    { new: newPriority, old: priority },
    { new: newDate, old: due },
    { new: newLabel, old: label },
  ];

  const resetValues = () => {
    setNewName(name);
    setNewDescription(description);
    setNewPriority(priority);
    setNewDate(due);
    setNewLabel(label);
    setEditing(false);
  };

  const valuesWereUpdated = () => {
    let updated = false;
    for (let value of values) {
      if (value.new !== value.old) updated = true;
    }
    return updated;
  };

  const close = () => {
    setEditing(false);
    onClose();
  };

  const handleClose = () => {
    if (valuesWereUpdated()) {
      setChangeWarning(true);
    } else {
      close();
    }
  };

  const confirmCancel = () => {
    setChangeWarning(false);
  };

  const confirmDiscard = () => {
    setChangeWarning(false);
    discardChanges();
    close();
  };

  // discards all form changes
  const discardChanges = () => {
    resetValues();
    setEditing(false);
  };

  const checkDiscard = () => {
    if (valuesWereUpdated()) {
      setChangeWarning(true);
    } else {
      discardChanges();
    }
  };

  const saveData = () => {
    dispatch({ type: UPDATE_TASK, payload: data });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
    >
      {editing ? (
        <Box sx={{ p: '1.5rem' }}>
          <Typography variant="h6" component="h3" sx={{ mb: '1.5rem' }}>
            Editing: {name}
          </Typography>
          <TextControl
            name="Task"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            autoFocus
          />
          <TextControl
            name="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            lines={3}
          />
          <DetailsGrid>
            <Grid item>
              <DueDateControl date={newDate} setDate={setNewDate} />
            </Grid>
            <Grid item>
              <PriorityControl
                priority={newPriority}
                setPriority={setNewPriority}
              />
            </Grid>
          </DetailsGrid>
          <ButtonGrid>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                onClick={checkDiscard}
                disableRipple
              >
                Discard
              </Button>
            </Grid>
            <Grid item>
              <Button
                disableRipple
                variant="contained"
                color="success"
                disableElevation
                onClick={saveData}
              >
                Save
              </Button>
            </Grid>
          </ButtonGrid>
        </Box>
      ) : (
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
              <Button
                disableRipple
                variant="outlined"
                onClick={() => setEditing(true)}
              >
                Update
              </Button>
            </Grid>
          </ButtonGrid>
        </Box>
      )}
    </Dialog>
  );
};

export default TaskDetails;
