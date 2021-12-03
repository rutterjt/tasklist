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

const ToDoItem = ({ name, description, priority, due, label, id }) => {
  const { dispatch } = useStore();
  // state to control checkbox
  const [checked, setChecked] = useState(false);

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

  // renders only the beginning of the item's description if over 100 characters
  const displayDescription =
    description.length > 100 ? description.slice(0, 98) + '...' : description;

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

        <ListItemButton disableRipple>
          <ListItemText primary={name} secondary={displayDescription} />
          <PriorityIcon priority={priority} />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ToDoItem;
