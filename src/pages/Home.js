import React from 'react';

import { Box } from '@mui/material';
import ToDoList from '../components/ToDoList';

const Home = ({ list }) => {
  return (
    <Box sx={{ ml: { md: '2rem' } }}>
      <ToDoList list={list} />
    </Box>
  );
};

export default Home;
