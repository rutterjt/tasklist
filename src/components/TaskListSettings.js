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
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// store
import { useStore } from '../store/useStore';
import { CHANGE_SORT_ORDER } from '../store/actions';

// hooks
import { usePopover } from '../hooks/usePopover';

// components
import ListHeader from './ListHeader';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const SettingsListItem = ({ value, sortBy, handleClick }) => (
  <ListItem disablePadding>
    <ListItemButton onClick={() => handleClick(value)}>
      {sortBy === value && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={sortBy !== value} primary={capitalize(value)} />
    </ListItemButton>
  </ListItem>
);

// Renders controls for the task's priority
const TaskListSettings = () => {
  const { dispatch, sortBy } = useStore();
  const [anchor, handleOpen, handleClose, open] = usePopover();

  // store
  const sortCreator = (order) => ({ type: CHANGE_SORT_ORDER, payload: order });

  const setSortBy = (order) => dispatch(sortCreator(order));

  const handleClick = (value) => {
    console.log('Clicked');
    setSortBy(value);
    handleClose();
  };

  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <IconButton aria-label="open list settings" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List dense>
          <ListHeader>Sort By</ListHeader>
          <Divider />
          <SettingsListItem
            value="default"
            handleClick={handleClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="alphabetically"
            handleClick={handleClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="due date"
            handleClick={handleClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="date added"
            handleClick={handleClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="priority"
            handleClick={handleClick}
            sortBy={sortBy}
          />
        </List>
      </Popover>
    </Box>
  );
};

export default TaskListSettings;
