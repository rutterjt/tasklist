import React from 'react';

// mui
import { Typography } from '@mui/material';

const TaskPrimaryInfo = ({ name }) => {
  return (
    <Typography
      gutterBottom
      variant="subtitle1"
      component="h3"
      sx={{ wordBreak: 'break-word' }}
    >
      {name}
    </Typography>
  );
};

export default TaskPrimaryInfo;
