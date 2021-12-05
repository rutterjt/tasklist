import React from 'react';
import { List, Typography, Box, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import ToDoItem from './ToDoItem';

const notDeleted = (item) => !item.deleted;

const ToDoList = ({ list = [], label = 'To do' }) => {
  const listEmpty = !list.filter(notDeleted).length;

  return (
    <Box sx={{ mt: '2rem' }}>
      <Typography variant="h6" component="h2">
        {listEmpty ? 'Your list is empty' : label}
      </Typography>
      {!listEmpty && (
        <List>
          <TransitionGroup>
            {list.map((item) => (
              <Collapse key={item.id}>
                <ToDoItem {...item} />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </Box>
  );
};

export default ToDoList;
