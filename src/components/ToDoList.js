import React from 'react';
import { List, Typography, Box, Collapse, Divider } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

// import ToDoItem from './ToDoItem';
import TaskListItem from './TaskListItem';
import TaskDetails from './TaskDetails';

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
            {list.map((task) => (
              <Collapse key={task.id}>
                <TaskListItem task={task} />
                <Divider variant="inset" component="li" />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </Box>
  );
};

export default ToDoList;
