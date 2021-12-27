import React, { useState } from 'react';

// mui
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItem,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const CollapseList = ({ label, secondaryAction, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <List>
      <ListItem
        sx={{ p: 0 }}
        secondaryAction={secondaryAction ? secondaryAction : null}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding>{children}</List>
      </Collapse>
    </List>
  );
};

export default CollapseList;
