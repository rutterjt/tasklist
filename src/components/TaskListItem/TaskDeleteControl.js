import React from 'react';

// mui
import { Checkbox } from '@mui/material';

const TaskDeleteControl = ({
  checked,
  handleCheck,
  action = 'Delete',
  taskName,
}) => (
  <Checkbox
    edge="end"
    onChange={handleCheck}
    checked={checked}
    inputProps={{ 'aria-label': `${action} task: ${taskName}` }}
  />
);

export default TaskDeleteControl;
