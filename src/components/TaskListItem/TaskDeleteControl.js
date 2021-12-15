import React from 'react';

// mui
import { Checkbox } from '@mui/material';

const TaskDeleteControl = ({ checked, handleCheck }) => (
  <Checkbox
    edge="end"
    onChange={handleCheck}
    checked={checked}
    inputProps={{ 'aria-labelledby': 'Delete item' }}
  />
);

export default TaskDeleteControl;
