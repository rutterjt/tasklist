import React from 'react';

// mui
import { Box } from '@mui/material';

// components
import ToDoList from '../components/ToDoList';
import AddItemForm from '../components/AddItemForm';

const Home = ({ list }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        pl: { md: '2rem' },
        pr: '2rem',
        pb: '2rem',
      }}
    >
      <ToDoList list={list} />
      <AddItemForm />
    </Box>
  );
};

export default Home;
