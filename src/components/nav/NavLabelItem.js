import React from 'react';

// mui
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// components
import NavLink from './NavLink';
import LabelSettings from './LabelSettings';

// colors
import { colors } from 'data/colors';

const NavLabelItem = ({ label }) => {
  const { name, color, id } = label;
  return (
    <ListItem sx={{ p: 0, pl: 4 }} secondaryAction={<LabelSettings id={id} />}>
      <NavLink to={`/label/${name}`}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <LocalOfferIcon sx={{ color: colors[color] }} />
        </ListItemIcon>
        <ListItemText primary={name} />
      </NavLink>
    </ListItem>
  );
};

export default NavLabelItem;
