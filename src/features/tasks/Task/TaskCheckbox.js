import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Checkbox } from '@mui/material';

/**
 * Renders the UI for a checkbox that deletes or restores a task.
 * @param {boolean} checked - Whether the checkbox is checked.
 * @param {function} handleCheck - Handles checking and unchecking the checkbox.
 * @param {string} taskName - The task's name. Used to create the checkbox's label.
 * @param {string} [action='Delete'] - (Optional, defaults 'Delete') Whether the checkbox is being rendered to delete or restore a task. Used to create the checkbox's label. Accepts two values: 'Delete' and 'Restore'.
 */
const TaskCheckbox = ({ checked, handleCheck, action, taskName }) => (
  <Checkbox
    edge="end"
    onChange={handleCheck}
    checked={checked}
    inputProps={{ 'aria-label': `Mark Completed: ${taskName}` }}
  />
);

TaskCheckbox.defaultProps = {
  action: 'Delete',
};

TaskCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
  action: PropTypes.oneOf(['Delete', 'Restore']).isRequired,
  taskName: PropTypes.string.isRequired,
};

export default TaskCheckbox;
