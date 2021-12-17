import React, { useState } from 'react';

// mui
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// store
import { useStore } from '../store/context';
import { ADD_TASK } from '../store/actions';

// components
import PriorityControl from './PriorityControl';
import DueDateControl from './DueDateControl';
import TextControl from './TextControl';
import WarningPopup from './WarningPopup';

// helpers
import isEmpty from 'lodash/isEmpty';

// Add task button: controls whether the form is visible
const AddButton = ({ openForm }) => (
  <Button
    variant="text"
    onClick={openForm}
    startIcon={<AddIcon />}
    disableRipple
  >
    Add task
  </Button>
);

// renders the task creation form's ui
const Form = ({ createItem, closeForm, updateData, formData, onSubmit }) => {
  // extract values from state
  const { name, description, priority, due } = formData;

  // create setters
  const setName = updateData('name');
  const setDescription = updateData('description');
  const setPriority = updateData('priority');
  const setDue = updateData('due');

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem();
    onSubmit();
  };

  const update = (setter) => (e) => setter(e.target.value);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ padding: '1rem', mb: '1rem' }}>
        <Typography component="h3" variant="body1" sx={{ mb: '1rem' }}>
          Add a Task
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
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DueDateControl date={due} setDate={setDue} />
          </Grid>
          <Grid item>
            <PriorityControl priority={priority} setPriority={setPriority} />
          </Grid>
        </Grid>
        <Box sx={{ mt: '1rem' }}>
          <Button
            variant="contained"
            sx={{ mr: '1rem' }}
            disableRipple
            disableElevation
            disabled={!name}
            type="submit"
          >
            Add Task
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={closeForm}
            disableRipple
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// main component control: maintains form state, handles dispatch to store
const TaskCreateForm = ({ defaultItem }) => {
  const { dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [formData, setFormData] = useState(
    defaultItem ? { ...defaultItem } : {}
  );

  console.log(formData);

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_TASK,
      payload: { ...data },
    };
  };

  const newItem = () => dispatch(itemCreator(formData));

  // accepts a string representing a task property,
  // returns a function that accepts a value, which updates the state as: state[property] = value;
  const updateData = (property) => (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [property]: value,
      };
    });
  };

  // clears the entire form
  const clearForm = () => setFormData({});

  // closes the form, closes the warning dialog, clears out all form data
  const confirmCloseForm = () => {
    setWarningOpen(false);
    setFormOpen(false);
    clearForm();
  };

  // attempts to close the form and discard changes
  // if form data is not empty: opens a warning dialog
  // if form data is empty: discards changes and closes form
  const closeForm = () => {
    if (isEmpty(formData)) confirmCloseForm();
    else setWarningOpen(true);
  };

  return (
    <Box sx={{ mt: '1rem' }}>
      {formOpen ? (
        <Form
          createItem={newItem}
          closeForm={closeForm}
          updateData={updateData}
          formData={formData}
          onSubmit={confirmCloseForm}
        />
      ) : (
        <AddButton openForm={() => setFormOpen(true)} />
      )}
      <WarningPopup
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone."
        handleCancel={() => setWarningOpen(false)}
        handleSuccess={confirmCloseForm}
        successLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </Box>
  );
};

export default TaskCreateForm;
