import React, { useState } from 'react';

// mui
import {
  Box,
  Button,
  Paper,
  TextField,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
// import FlagIcon from '@mui/icons-material/Flag';
// import { indigo, purple, red } from '@mui/material/colors';

// store
import { useStore } from '../store/context';
import { ADD_ITEM } from '../store/actions';

// priority flag colors mapping
// const flagColors = [null, red[500], purple[500], indigo[500]];

// child components
const AddButton = ({ setFormOpen }) => (
  <Button
    variant="text"
    onClick={() => setFormOpen(true)}
    startIcon={<AddIcon />}
    disableRipple
  >
    Add item
  </Button>
);

const CustomForm = ({ createItem, closeForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const update = (setter) => (e) => setter(e.target.value);
  const resetForm = () => {
    setName('');
    setDescription('');
    closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem({ name, description });
    resetForm();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ padding: '1rem', mb: '1rem' }}>
        <Typography component="h3" variant="body1" sx={{ mb: '1rem' }}>
          Add a Task
        </Typography>
        <TextField
          id="task"
          label="Task"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: '1rem' }}
          required
          autoFocus
        />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={update(setDescription)}
          multiline
          fullWidth
          minRows={3}
          variant="outlined"
          sx={{ mb: '1rem' }}
        />
        {/* <Box>
          <IconButton aria-label="Set Priority">
            {priority >= 4 ? (
              <FlagOutlinedIcon />
            ) : (
              <FlagIcon sx={{ color: flagColors[priority] }} />
            )}
          </IconButton>
        </Box> */}
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

const AddItemForm = () => {
  const { dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  // const [priority, setPriority] = useState(4);
  // const [priorityPopup, setPriorityPopup] = useState(false);

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
        <CustomForm createItem={newItem} closeForm={() => setFormOpen(false)} />
      ) : (
        <AddButton setFormOpen={setFormOpen} />
      )}
    </Box>
  );
};

export default AddItemForm;
