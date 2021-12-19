import React, { useState } from 'react';

// mui
import { Box, Typography, Grid, Button } from '@mui/material';

// components
import TextControl from './TextControl';
import { DetailsGrid, ButtonGrid } from 'components/TaskDetails';
import PriorityControl from './PriorityControl';
import DueDateControl from './DueDateControl';

// store
import { useStore } from 'store/useStore';
import { UPDATE_TASK } from 'store/actions';

const TaskUpdateForm = ({ task, handleClose, handleSave }) => {
  const { dispatch } = useStore();
  const [data, setData] = useState({ ...task });
  const { name, description, due, priority, id } = data;

  // updates a given value in the state object
  // accepts a string representing the object key
  // returns a new function that accepts a value prop and updates the state with the key/value pair
  const set = (key) => (value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  // individual setters
  const setName = set('name');
  const setDescription = set('description');
  const setDue = set('due');
  const setPriority = set('priority');

  const update = (setter) => (e) => setter(e.target.value);

  // store
  const updateCreator = (id, data) => ({
    type: UPDATE_TASK,
    payload: { id, data },
  });

  const updateTask = () => dispatch(updateCreator(id, data));

  const saveData = () => {
    updateTask();
    handleSave();
  };

  return (
    <Box sx={{ p: '1.5rem' }}>
      <Typography variant="h6" component="h3" sx={{ mb: '1.5rem' }}>
        Editing: {name}
      </Typography>
      <TextControl
        name="Task"
        value={name || ''}
        onChange={update(setName)}
        required
        autoFocus
      />
      <TextControl
        name="Description"
        value={description || ''}
        onChange={update(setDescription)}
        lines={3}
      />
      <DetailsGrid>
        <Grid item>
          <DueDateControl date={due} setDate={setDue} />
        </Grid>
        <Grid item>
          <PriorityControl priority={priority} setPriority={setPriority} />
        </Grid>
      </DetailsGrid>
      <ButtonGrid>
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
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
  );
};

export default TaskUpdateForm;
