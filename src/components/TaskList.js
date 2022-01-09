import React, { useState, useCallback } from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { List, Typography, Box, Grid } from '@mui/material';

// components
import TaskListItem from './TaskListItem';
import TaskListSettings from './TaskListSettings';
import UndoAlert from './UndoAlert';

// redux
// import { useSelector, shallowEqual } from 'react-redux';

// store
// import { selectTaskIds } from '../store/slices/listSlice';

// const notDeleted = (item) => !item.deleted;

/**
 * Renders a list of tasks.
 * @param {array} list - The list of items to render. Should be either state.list or a subset of it.
 * @param {string} label - The list's title.
 */
const TaskList = ({ list, label }) => {
  // const { sortBy } = useState('default');
  // const sortByName = useSelector(useSelector);
  const listEmpty = !list.length;
  const [deletedTask, setDeletedTask] = useState('');

  // task delete
  const handleDeleteTask = useCallback((id) => {
    setDeletedTask(id);
  }, []);

  const handleUndoDeleteTask = () => {
    setDeletedTask('');
  };

  // let sortedList = [...list];

  // if (sortBy !== 'default') sortedList.sort(sortCallback);

  const listContents = list.map((id) => (
    <TaskListItem key={id} id={id} handleDelete={handleDeleteTask} />
  ));

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
      {!listEmpty && <List>{listContents}</List>}
      <UndoAlert
        open={!!deletedTask}
        id={deletedTask}
        handleClose={handleUndoDeleteTask}
      />
    </Box>
  );
};

TaskList.defaultProps = {
  label: 'To do',
};

TaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
};

export default TaskList;
