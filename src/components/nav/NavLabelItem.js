import React from 'react';

// mui
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// components
import NavLink from './NavLink';

// colors
import { colors } from 'data/colors';

const NavLabelItem = ({ label }) => {
  const { name, color } = label;
  return (
    <ListItem
      sx={{ p: 0, pl: 4 }}
      secondaryAction={
        <IconButton aria-label="more options" edge="end">
          <MoreHorizIcon />
        </IconButton>
      }
    >
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
