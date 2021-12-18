import React, { useState } from 'react';

// mui
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components
import CollapseList from './CollapseList';
import NavLabelItem from './NavLabelItem';

// store
import { useStore } from '../store/context';

const AddLabelButton = ({ handleClick }) => (
  <IconButton edge="end" aria-label="add label" onClick={handleClick}>
    <AddIcon />
  </IconButton>
);

const NavLabelsList = () => {
  return (
    <CollapseList label="Labels" secondaryAction={<AddLabelButton />}>
      <NavLabelItem label="Anime" />
      <NavLabelItem label="Manga" />
      <NavLabelItem label="Jazz" />
      <NavLabelItem label="Figure Skating Skating Skating" />
    </CollapseList>
  );
};

export default NavLabelsList;
