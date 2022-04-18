import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { List, Typography, Box } from '@mui/material';

// components
import CompletedTask from './CompletedTask';

/**
 * A modified TaskList, for rendering completed tasks.
 * @param {array} [list=[]] - (Optional) list, an array of list items. Should be the state.deleted array.
 * @param {string} [label="Completed tasks"] - The list's title.
 */
const CompletedTaskList = ({ list = [], label = 'Completed tasks' }) => {
  return (
    <Box sx={{ pt: 1 }}>
      <Typography variant="h6" component="h2">
        {list.length <= 0 ? 'No completed tasks' : label}
      </Typography>
      {list.length > 0 && (
        <List>
          {list.map((task) => (
            <CompletedTask key={task.id} task={task} />
          ))}
          TextControl
        </List>
      )}
    </Box>
  );
};

CompletedTaskList.defaultProps = {
  list: [],
  label: 'Completed tasks',
};

CompletedTaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export default CompletedTaskList;
