import React from 'react';

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
} from '@mui/material';

// components
import PriorityIcon from '../PriorityIcon';
import ListHeader from '../ListHeader';

// hooks
import { usePopover } from '../../hooks/usePopover';

// Renders controls for the task's priority
const PriorityControl = ({ priority, setPriority }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();

  const handleClick = (num) => {
    setPriority(num);
    handleClose();
  };

  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <IconButton aria-label="Set Priority" onClick={handleOpen}>
        <PriorityIcon priority={priority} />
      </IconButton>
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

export default PriorityControl;
