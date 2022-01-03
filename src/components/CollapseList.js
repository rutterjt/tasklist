import React, { useState } from 'react';

// proptypes
import PropTypes from 'prop-types';

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

/**
 * Renders a MUI List component with a dropdownlist.
 * @param {string} label - The text for the dropdown trigger.
 * @param {any} secondaryAction - JSX element to provide secondary functionality to the dropdown button.
 * @param {any} children - The content of the dropdown <List>.
 */
const CollapseList = ({ label, secondaryAction, children }) => {
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

CollapseList.defaultProps = {
  secondaryAction: null,
};

CollapseList.propTypes = {
  label: PropTypes.string.isRequired,
  secondaryAction: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default CollapseList;
