import React, { useState } from 'react';

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

// Renders controls for the task's priority
const PriorityControl = ({ priority, setPriority }) => {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleListClick = (num) => {
    setPriority(num);
    handleClose();
  };

  const open = !!anchor;
  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <IconButton aria-label="Set Priority" onClick={handleClick}>
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
              <ListItemButton onClick={() => handleListClick(num)}>
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
