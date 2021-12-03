import React from 'react';
import { List, Typography, Box, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import ToDoItem from './ToDoItem';

const ToDoList = ({ type, list }) => {
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
    <Box sx={{ mt: '2rem' }}>
      <List>
        <TransitionGroup>
          {list.map((item) => (
            <Collapse key={item.id}>
              <ToDoItem {...item} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};

export default ToDoList;
