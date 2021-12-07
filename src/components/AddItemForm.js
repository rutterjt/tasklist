import React, { useState } from 'react';

// mui
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// store
import { useStore } from '../store/context';
import { ADD_ITEM } from '../store/actions';

// components
import PriorityControl from './PriorityControl';
import DueDateControl from './DueDateControl';
import TextControl from './TextControl';

// Add task button: controls whether the form is visible
const AddButton = ({ setFormOpen }) => (
  <Button
    variant="text"
    onClick={() => setFormOpen(true)}
    startIcon={<AddIcon />}
    disableRipple
  >
    Add task
  </Button>
);

// renders the task creation form's ui
const FormDisplay = ({
  handleSubmit,
  closeForm,
  name,
  setName,
  description,
  setDescription,
  priority,
  setPriority,
  date,
  setDate,
}) => {
  const update = (setter) => (e) => setter(e.target.value);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ padding: '1rem', mb: '1rem' }}>
        <Typography component="h3" variant="body1" sx={{ mb: '1rem' }}>
          Add a Task
        </Typography>
        <TextControl
          name="Task"
          value={name}
          onChange={update(setName)}
          required
          autoFocus
        />
        <TextControl
          name="Description"
          value={description}
          onChange={update(setDescription)}
          lines={3}
        />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DueDateControl date={date} setDate={setDate} />
          </Grid>
          <Grid item>
            <PriorityControl priority={priority} setPriority={setPriority} />
          </Grid>
        </Grid>
      </Paper>
      <Box>
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
    </Box>
  );
};

// renders the form, maintains all form state
const FormWrapper = ({ createItem, closeForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(4);
  const [date, setDate] = useState(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem({ name, description, priority, due: date });
    resetForm();
  };
  return (
    <FormDisplay
      handleSubmit={handleSubmit}
      closeForm={closeForm}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      priority={priority}
      setPriority={setPriority}
      date={date}
      setDate={setDate}
    />
  );
};

// main form control
const AddItemForm = () => {
  const { dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_ITEM,
      payload: { ...data },
    };
  };

  const newItem = (data) => dispatch(itemCreator(data));

  return (
    <Box sx={{ mt: '0.5rem' }}>
      {formOpen ? (
        <FormWrapper
          createItem={newItem}
          closeForm={() => setFormOpen(false)}
        />
      ) : (
        <AddButton setFormOpen={setFormOpen} />
      )}
    </Box>
  );
};

export default AddItemForm;
