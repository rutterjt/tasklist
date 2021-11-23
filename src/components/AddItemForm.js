import React, { useState } from 'react';

// mui
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// store
import { useStore } from '../store/context';
import { ADD_ITEM } from '../store/actions';

const AddItemForm = () => {
  const { list, dispatch } = useStore();
  const [formData, setFormData] = useState({});

  const testItemCreator = () => {
    return {
      type: ADD_ITEM,
      payload: { name: 'Test Item', description: 'Test Description' },
    };
  };

  const newTestItem = () => dispatch(testItemCreator());

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <Button
        variant="text"
        onClick={newTestItem}
        startIcon={<AddIcon />}
        sx={{ ml: '4rem' }}
      >
        Add item
      </Button>
    </Box>
  );
};

export default AddItemForm;
