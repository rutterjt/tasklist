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
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';

// store
import { useStore } from 'store/useStore';
import { CHANGE_SORT_ORDER } from 'store/actions';

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
  const [anchor, setAnchor] = useState(null);

  // store
  const sortCreator = (order) => ({ type: CHANGE_SORT_ORDER, payload: order });

  const setSortBy = (order) => dispatch(sortCreator(order));

  // event handlers
  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleListClick = (value) => {
    console.log('Clicked');
    setSortBy(value);
    handleClose();
  };

  const open = !!anchor;
  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <IconButton aria-label="open settings" onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List dense>
          <ListItem>
            <ListItemText>
              <span style={{ fontWeight: 'bold' }}>Sort By</span>
            </ListItemText>
          </ListItem>
          <Divider />
          <SettingsListItem
            value="default"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="alphabetically"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="due date"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="date added"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="priority"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
        </List>
      </Popover>
    </Box>
  );
};

export default TaskListSettings;
