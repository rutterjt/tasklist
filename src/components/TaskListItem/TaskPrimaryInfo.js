import React from 'react';

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

export default TaskPrimaryInfo;
