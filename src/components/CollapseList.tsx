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

type Props = {
  label: string;
  secondaryAction: React.ReactNode;
};

/**
 * Renders a MUI List component with a dropdownlist.
 */
export const CollapseList: React.FC<Props> = ({
  label,
  secondaryAction,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <List>
      <ListItem sx={{ p: 0 }} secondaryAction={secondaryAction}>
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
