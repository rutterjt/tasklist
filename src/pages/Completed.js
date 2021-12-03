import React from 'react';

// mui
import { Box, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

// components
import ToDoList from '../components/ToDoList';

// store
import { useStore } from '../store/context';
import { EMPTY_TRASH } from '../store/actions';

const Completed = ({ list }) => {
  const { dispatch } = useStore();
  const deleteCreator = () => ({ type: EMPTY_TRASH });
  const deleteAll = () => dispatch(deleteCreator());

  return (
    <Box sx={{ ml: { md: '2rem' } }}>
      <ToDoList list={list} noCheckbox />
      <Button
        onClick={deleteAll}
        color="error"
        startIcon={<Delete />}
        sx={{ mt: '0.5rem', ml: '4rem' }}
      >
        Delete All
      </Button>
    </Box>
  );
};

export default Completed;
