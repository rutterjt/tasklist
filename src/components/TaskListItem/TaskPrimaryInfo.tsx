import React from 'react';

// mui
import { Typography } from '@mui/material';

type Props = {
  name: string;
};

/**
 * Renders a formatted MUI Typography element to display the task's name.
 */
export const TaskPrimaryInfo: React.FC<Props> = ({ name }) => (
  <Typography
    variant="subtitle1"
    component="h3"
    gutterBottom
    sx={{ wordBreak: 'break-word' }}
  >
    {name}
  </Typography>
);

export default TaskPrimaryInfo;
