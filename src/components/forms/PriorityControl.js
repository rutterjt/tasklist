import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';

// components
import PriorityIcon from '../PriorityIcon';
import ListHeader from '../ListHeader';

// hooks
import { usePopover } from '../../hooks/usePopover';

/**
 * A form control for selecting a task's priority.
 *
 * Renders a button that opens a PopOver with options to select a priority.
 * @param {number} [priority] - A number representing the priority.
 * @param {function} setPriority - A setter for task.priority.
 */
const PriorityControl = ({ priority, setPriority }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();

  const handleClick = (num) => {
    setPriority(num);
    handleClose();
  };

  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <Tooltip title="Set Priority">
        <IconButton aria-label="Set Priority" onClick={handleOpen}>
          <PriorityIcon priority={priority} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListHeader>Priority</ListHeader>
          <Divider />
          {[1, 2, 3, 4].map((num) => (
            <ListItem key={num} sx={{ p: 0 }}>
              <ListItemButton onClick={() => handleClick(num)}>
                <ListItemIcon>
                  <PriorityIcon priority={num} />
                </ListItemIcon>
                <ListItemText>Priority {num}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

PriorityControl.propTypes = {
  priority: PropTypes.number,
  setPriority: PropTypes.func.isRequired,
};

export default PriorityControl;
