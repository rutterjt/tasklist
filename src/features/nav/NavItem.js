import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// mui
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';

// components
import { NavLink } from './NavLink';

import { selectBadgeContent } from '../tasks/tasksSlice';

/**
 * Renders a nav list item. The NavItem component handles appearance and UI of the list item, and renders a NavLink to handle the routing logic.
 * @param {string} title - The link text.
 * @param {string} to - The link destination. Passed to the NavLink.
 * @param {array} filter - A callback function to filter the list (to extract the badge number). Should take a list entity object
 * @param {object} icon - The icon for the list item.
 */
const NavItem = ({ title, to, filter, icon }) => {
  const badgeContent = useSelector((state) =>
    selectBadgeContent(state, filter)
  );
  return (
    <ListItem sx={{ p: 0 }}>
      <NavLink to={to}>
        <ListItemIcon>
          <Badge
            badgeContent={badgeContent}
            color={title === 'Past Due' ? 'error' : 'primary'}
          >
            {icon}
          </Badge>
        </ListItemIcon>
        <ListItemText primary={title} />
      </NavLink>
    </ListItem>
  );
};

NavItem.defaultProps = {
  filter: () => false,
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};

export default NavItem;
