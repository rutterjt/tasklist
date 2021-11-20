import React from 'react';
import { List, Typography, Box } from '@mui/material';

import ToDoItem from './ToDoItem';

const ToDoList = ({ list }) => {
  if (!list || !list.length) {
    return (
      <Box sx={{ mt: '2rem' }}>
        <Typography variant="h6" component="h2">
          Your list is empty.
        </Typography>
      </Box>
    );
  }
  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        {list.map((item) => (
          <ToDoItem key={item.id} {...item} />
        ))}
      </List>
    </div>
  );
};

export default ToDoList;
