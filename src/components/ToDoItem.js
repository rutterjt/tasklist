import React, { useState, useEffect, useCallback } from 'react';

// mui
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Checkbox,
} from '@mui/material';

import PriorityIcon from './PriorityIcon';

// store
import { useStore } from '../store/context';
import { DELETE_ITEM } from '../store/actions';

// components
import TaskDetails from './TaskDetails';

const ToDoItem = ({ name, description, priority, due, label, id }) => {
  const item = { name, description, priority, due, label, id };
  const { dispatch } = useStore();
  // state to control checkbox
  const [checked, setChecked] = useState(false); // state to control checkbox
  const [detailsOpen, setDetailsOpen] = useState(false); // state to control modal dialogue to display task details

  // action creator
  const deleteCreator = (id) => {
    return { type: DELETE_ITEM, payload: id };
  };

  // uses useCallback to prevent triggering component rerenders, since deleteItem needs to be in the useEffect dependency array
  const deleteItem = useCallback(
    (id) => {
      dispatch(deleteCreator(id));
    },
    [dispatch]
  );

  // creates a 500ms delay before the item is deleted
  useEffect(() => {
    let deleteTimeout;
    if (checked) {
      deleteTimeout = setTimeout(() => deleteItem(id), 500);
    } else {
      clearTimeout(deleteTimeout);
    }
    return () => clearTimeout(deleteTimeout);
  }, [checked, deleteItem, id]);

  // check handler
  const handleCheck = (e) => {
    setChecked((prev) => !prev);
  };

  // handle clicks to main button

  const closeDetails = () => setDetailsOpen(false);
  const openDetails = () => setDetailsOpen(true);

  // renders only the beginning of the item's description if over 100 characters
  const displayDescription = description
    ? description.length > 100
      ? description.slice(0, 98) + '...'
      : description
    : '';

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <Checkbox
            edge="end"
            onChange={handleCheck}
            checked={checked}
            inputProps={{ 'aria-labelledby': 'Delete item' }}
          />
        </ListItemIcon>

        <ListItemButton disableRipple onClick={openDetails}>
          <ListItemText primary={name} secondary={displayDescription} />
          <PriorityIcon priority={priority} />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
      <TaskDetails open={detailsOpen} onClose={closeDetails} {...item} />
    </>
  );
};

export default ToDoItem;
