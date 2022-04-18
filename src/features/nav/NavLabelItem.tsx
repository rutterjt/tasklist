import React from 'react';

// redux
import { useAppSelector } from '../../app/hooks';

// mui
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// components
import NavLink from './NavLink';
import LabelSettings from '../labels/LabelSettings';

// colors
import { colors } from '../../data/colors';

// store
import { selectLabelById } from '../labels/labelsSlice';

type Props = {
  labelId: string;
};

/**
 * A modified NavItem, for rendering links to label pages.
 */
export const NavLabelItem: React.FC<Props> = ({ labelId }) => {
  const { name, color } = useAppSelector((state) =>
    selectLabelById(state, labelId)
  );
  return (
    <ListItem
      sx={{ p: 0, pl: 4 }}
      secondaryAction={<LabelSettings labelId={labelId} />}
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
