import React, { useState, useCallback } from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { List, Typography, Box, Grid } from '@mui/material';

// components
import Task from './Task';
import TaskListSettings from './TaskListSettings';

// redux
// import { useSelector, shallowEqual } from 'react-redux';

// store
// import { selectTaskIds } from '../store/slices/tasksSlice';

// const notDeleted = (item) => !item.deleted;

/**
 * Renders a list of tasks.
 * @param {array} list - The list of items to render. Should be either state.list or a subset of it.
 * @param {string} label - The list's title.
 */
const TaskList = ({ taskIds, label }) => {
  // const { sortBy } = useState('default');
  // const sortByName = useSelector(useSelector);
  const listIsEmpty = !taskIds.length;
  const [deletedTask, setDeletedTask] = useState('');

  // task delete
  const handleDeleteTask = useCallback((id) => {
    setDeletedTask(id);
  }, []);

  // const handleUndoDeleteTask = () => {
  //   setDeletedTask('');
  // };

  // let sortedList = [...list];

  // if (sortBy !== 'default') sortedList.sort(sortCallback);

  let listContent;

  if (taskIds.length) {
    listContent = taskIds.map((taskId) => (
      <Task key={taskId} taskId={taskId} handleDelete={handleDeleteTask} />
    ));
  }

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h2">
            {listIsEmpty ? 'Your list is empty' : label}
          </Typography>
        </Grid>
        <Grid item>
          <TaskListSettings />
        </Grid>
      </Grid>
      {!listIsEmpty && <List>{listContent}</List>}
    </Box>
  );
};

TaskList.defaultProps = {
  label: 'To do',
};

TaskList.propTypes = {
  taskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
};

export default TaskList;
