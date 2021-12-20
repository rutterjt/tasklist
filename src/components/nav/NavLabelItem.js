import React from 'react';

// mui
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// components
import NavLink from './NavLink';

const NavLabelItem = ({ label }) => {
  return (
    <ListItem sx={{ p: 0, pl: 4 }}>
      <NavLink to={`/label/${label}`}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <LocalOfferIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={label} />
      </NavLink>
    </ListItem>
  );
};

export default NavLabelItem;
