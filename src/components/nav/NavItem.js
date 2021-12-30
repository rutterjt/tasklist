import React from 'react';

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

export default NavItem;
