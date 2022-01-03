import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Typography } from '@mui/material';

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
