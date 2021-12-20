import React from 'react';

// mui
import { List, Typography, Box, Collapse, Divider, Grid } from '@mui/material';

// transition group
import { TransitionGroup } from 'react-transition-group';

// components
import TaskListItem from './TaskListItem';
import TaskListSettings from './TaskListSettings';

// store
import { useStore } from 'store/useStore';

const notDeleted = (item) => !item.deleted;

const TaskList = ({ list = [], label = 'To do' }) => {
  const { sortBy } = useStore();
  const listEmpty = !list.filter(notDeleted).length;

  // sorting
  let sortCallback = (a, b) => 0;
  switch (sortBy) {
    case 'alphabetically':
      sortCallback = (a, b) => {
        return a.name < b.name ? -1 : 1;
      };
      break;
    case 'due date':
      sortCallback = (a, b) => {
        if (!b.due) return -1;
        if (!a.due) return 1;
        return a.due - b.due;
      };
      break;
    case 'priority':
      sortCallback = (a, b) => a.priority - b.priority;
      break;
    case 'date added':
    case 'default':
    default:
      sortCallback = (a, b) => 0;
  }

  let sortedList = [...list];

  if (sortBy !== 'default') sortedList.sort(sortCallback);

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h2">
            {listEmpty ? 'Your list is empty' : label}
          </Typography>
        </Grid>
        <Grid item>
          <TaskListSettings />
        </Grid>
      </Grid>
      {!listEmpty && (
        <List>
          <TransitionGroup>
            {sortedList.map((task) => (
              <Collapse key={task.id}>
                <TaskListItem task={task} />
                <Divider component="li" sx={{ ml: 7 }} />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </Box>
  );
};

export default TaskList;
