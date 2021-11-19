import React, { useState } from 'react';

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Checkbox,
} from '@mui/material';

const ToDoItem = ({
  name,
  description,
  due,
  label,
  deleteItem,
  updateItem,
}) => {
  const [active, setActive] = useState(true);
  const handleCheck = () => {
    setActive((prev) => !prev);
  };
  const displayDescription =
    description.length > 100 ? description.slice(0, 98) + '...' : description;

  // timeout after checking box, before item disappears
  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <Checkbox
            edge="end"
            onChange={handleCheck}
            checked={!active}
            inputProps={{ 'aria-labelledby': 'Delete item' }}
          />
        </ListItemIcon>

        <ListItemButton disableRipple>
          <ListItemText primary={name} secondary={displayDescription} />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ToDoItem;
