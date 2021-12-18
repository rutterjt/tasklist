import React, { useMemo } from 'react';

// routing
import { Link as RouterLink, useLocation } from 'react-router-dom';

// mui
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const NavLabelItem = ({ label }) => {
  const { pathname } = useLocation();

  const renderLink = useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return (
          <RouterLink
            to={`/label/${label}`}
            ref={ref}
            {...itemProps}
            role={undefined}
          />
        );
      }),
    [label]
  );

  return (
    <ListItem sx={{ p: 0, pl: 4 }}>
      <ListItemButton
        component={renderLink}
        selected={pathname === `/label/${label}`}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <LocalOfferIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavLabelItem;
