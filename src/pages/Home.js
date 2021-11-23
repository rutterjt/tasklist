import React from 'react';

// mui
import { Box } from '@mui/material';

// components
import ToDoList from '../components/ToDoList';
import AddItemForm from '../components/AddItemForm';

const Home = ({ list }) => {
  return (
    <Box sx={{ ml: { md: '2rem' } }}>
      <ToDoList list={list} />
      <AddItemForm />
    </Box>
  );
};

export default Home;
