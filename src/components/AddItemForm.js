import React, { useState } from 'react';

// mui
import { Box, Button, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// store
import { useStore } from '../store/context';
import { ADD_ITEM } from '../store/actions';

const AddItemForm = () => {
  const { list, dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_ITEM,
      payload: { ...data },
    };
  };

  const newItem = (data) => dispatch(itemCreator(data));

  // child components
  const AddButton = () => (
    <Button
      variant="text"
      onClick={() => setFormOpen(true)}
      startIcon={<AddIcon />}
      disableRipple
    >
      Add item
    </Button>
  );

  const CustomForm = () => (
    <Box component="form">
      <Paper sx={{ padding: '1rem', mb: '1rem' }}>
        <TextField
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          sx={{ mb: '1rem' }}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          fullWidth
          minRows={2}
          variant="standard"
        />
      </Paper>
      <Box>
        <Button
          variant="contained"
          sx={{ mr: '1rem' }}
          disableRipple
          disableElevation
          disabled={!name}
        >
          Add Item
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setFormOpen(false)}
          disableRipple
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ mt: '0.5rem' }}>{formOpen ? <CustomForm /> : <AddButton />}</Box>
  );
};

export default AddItemForm;
