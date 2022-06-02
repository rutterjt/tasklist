import React from 'react';

// mui
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// components
import NavLink from './NavLink';
import LabelSettings from './LabelSettings';

// colors
import { colors } from '../../data/colors';

import type { LabelType } from '../../types';

type Props = {
  label: LabelType;
};

/**
 * A modified NavItem, for rendering links to label pages.
 */
export const NavLabelItem: React.FC<Props> = ({ label }) => {
  const { name, color, id } = label;
  return (
    <ListItem sx={{ p: 0, pl: 4 }} secondaryAction={<LabelSettings id={id} />}>
      <NavLink to={`/label/${name}`}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <LocalOfferIcon
            sx={{
              color: color ? colors[color as keyof typeof colors] : 'grey',
            }}
          />
        </ListItemIcon>
        <ListItemText primary={name} />
      </NavLink>
    </ListItem>
  );
};

export default NavLabelItem;
