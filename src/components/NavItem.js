import React, { useMemo } from 'react';

// routing
import { Link as RouterLink, useLocation } from 'react-router-dom';

// mui
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';

const NavItem = ({ title, list, icon, to }) => {
  const { pathname } = useLocation();

  const renderLink = useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
      )),
    [to]
  );

  return (
    <ListItem selected={pathname === to} button component={renderLink}>
      <ListItemIcon>
        <Badge
          badgeContent={list.length}
          color={title === 'Past Due' ? 'error' : 'secondary'}
        >
          {icon}
        </Badge>
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default NavItem;
