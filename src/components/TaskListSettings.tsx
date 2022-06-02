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
  Tooltip,
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

type SortOption =
  | 'default'
  | 'alphabetically'
  | 'due date'
  | 'date added'
  | 'priority';

const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

type ItemProps = {
  value: SortOption;
  sortBy: string;
  handleClick: (value: SortOption) => void;
};

const SettingsListItem: React.FC<ItemProps> = ({
  value,
  sortBy,
  handleClick,
}) => (
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
export const TaskListSettings = () => {
  const { dispatch, sortBy } = useStore();
  const [anchor, handleOpen, handleClose, open] = usePopover();

  // store
  const sortCreator = (order: SortOption) => ({
    type: CHANGE_SORT_ORDER,
    payload: order,
  });

  const setSortBy = (order: SortOption) => dispatch(sortCreator(order));

  const handleClick = (value: SortOption) => {
    setSortBy(value);
    handleClose();
  };

  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <Tooltip title="Sort list">
        <IconButton aria-label="sort list" onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

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
