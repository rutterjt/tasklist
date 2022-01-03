import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { List, Typography, Box, Grid } from '@mui/material';

// components
import TaskListItem from './TaskListItem';
import TaskListSettings from './TaskListSettings';

// store
import { useStore } from '../store/useStore';

const notDeleted = (item) => !item.deleted;

const TaskList = ({ list, label }) => {
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
          {sortedList.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </List>
      )}
    </Box>
  );
};

TaskList.defaultProps = {
  list: [],
  label: 'To do',
};

TaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export default TaskList;
