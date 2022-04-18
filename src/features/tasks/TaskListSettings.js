import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';

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
// import { sortByUpdated, selectSortByName } from '../features/sortBySlice';

// hooks
import { usePopover } from '../../hooks/usePopover';

// components
import { ListHeader } from '../../components';

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

/**
 * Renders a button that, when pressed, opens a popover that allows users to sort the list in different ways.
 *
 */
const TaskListSettings = () => {
  const dispatch = useDispatch();
  // const sortBy = useSelector(selectSortByName);
  const sortBy = null; // TODO: convert to reducer selector
  const [anchor, handleOpen, handleClose, open] = usePopover();

  const handleClick = (value) => {
    // dispatch(sortByUpdated(value));
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
