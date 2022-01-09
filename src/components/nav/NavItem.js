import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';

// components
import NavLink from './NavLink';

/**
 * Renders a nav list item. The NavItem component handles appearance and UI of the list item, and renders a NavLink to handle the routing logic.
 * @param {string} title - The link text.
 * @param {array} [list=[]] - The list associated with the link. If provided, the list's length will be shown as a badge.
 * @param {object} icon - The icon for the list item.
 * @param {string} to - The link destination. Passed to the NavLink.
 */
const NavItem = ({ title, list, icon, to }) => {
  return (
    <ListItem sx={{ p: 0 }}>
      <NavLink to={to}>
        <ListItemIcon>
          <Badge
            badgeContent={list.length}
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
  list: [],
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  icon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavItem;
