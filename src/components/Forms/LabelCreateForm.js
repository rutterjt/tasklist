import React, { useState } from 'react';

// mui
import { Box, Paper, Typography, Button } from '@mui/material';

// components
import TextControl from './TextControl';

// store
import { useStore } from '../../store/useStore';
import { ADD_LABEL } from '../../store/actions';

// renders the task creation form's ui
const Form = ({ formData, onSubmit, updateData, closeForm }) => {
  // extract values from state
  const { name } = formData;

  // create setters
  const setName = updateData('name');

  const update = (setter) => (e) => setter(e.target.value);

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Paper sx={{ padding: '1rem' }}>
        <Typography component="h3" variant="h6" sx={{ mb: '1.5rem' }}>
          Create Label
        </Typography>
        <TextControl
          name="Name"
          value={name || ''}
          onChange={update(setName)}
          required
          autoFocus
        />
        <Box sx={{ mt: '1rem' }}>
          <Button
            variant="contained"
            sx={{ mr: '1rem' }}
            disableRipple
            disableElevation
            disabled={!name}
            type="submit"
          >
            Create Label
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

const LabelCreateForm = ({ closeForm }) => {
  const { dispatch } = useStore();
  const [formData, setFormData] = useState(false);

  // store
  const addLabelCreator = (formData) => ({
    type: ADD_LABEL,
    payload: { ...formData },
  });

  const createLabel = () => dispatch(addLabelCreator(formData));

  // form
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createLabel();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      formData={formData}
      updateData={updateData}
      closeForm={closeForm}
    />
  );
};

export default LabelCreateForm;
