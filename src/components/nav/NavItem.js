import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';

// components
import NavLink from './NavLink';

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

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  icon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavItem;
