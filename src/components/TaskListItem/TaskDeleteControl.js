import React from 'react';

// proptypes
import PropTypes from 'prop-types';

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

TaskDeleteControl.defaultProps = {
  action: 'Delete',
};

TaskDeleteControl.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
  action: PropTypes.oneOf(['Delete', 'Restore']).isRequired,
  taskName: PropTypes.string.isRequired,
};

export default TaskDeleteControl;
