import React from 'react';

// routing
import { useLocation } from 'react-router-dom';

// mui
import { ListItemButton } from '@mui/material';

// hooks
import { useRenderLink } from 'hooks/useRenderLink';

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const renderLink = useRenderLink(to);

  return (
    <ListItemButton component={renderLink} selected={pathname === to}>
      {children}
    </ListItemButton>
  );
};

export default NavLink;
