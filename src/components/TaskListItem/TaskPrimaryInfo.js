import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Typography } from '@mui/material';

/**
 * Renders a formatted MUI Typography element to display the task's name.
 * @param {string} name - The task's name.
 */
const TaskPrimaryInfo = ({ name }) => {
  return (
    <Typography
      variant="subtitle1"
      component="h3"
      gutterBottom
      sx={{ wordBreak: 'break-word' }}
    >
      {name}
    </Typography>
  );
};

TaskPrimaryInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TaskPrimaryInfo;
