import React from 'react';

// mui
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';

// components
import NavLink from './NavLink';

import type { TaskType } from '../../types';

export type NavLinkType = {
  title: string;
  list: TaskType[];
  icon: JSX.Element;
  to: string;
};

/**
 * Renders a nav list item. The NavItem component handles appearance and UI of the list item, and renders a NavLink to handle the routing logic.
 */
export const NavItem: React.FC<NavLinkType> = ({
  title,
  list = [],
  icon,
  to,
}) => (
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

export default NavItem;
