import React from 'react';

// mui
import { Checkbox } from '@mui/material';

type Props = {
  checked: boolean;
  handleCheck: () => void;
  taskName: string;
  action?: 'Delete' | 'Restore';
};

/**
 * Renders the UI for a checkbox that deletes or restores a task.
 */
export const TaskDeleteControl: React.FC<Props> = ({
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
