import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// components
import NavLink from './NavLink';
import LabelSettings from './LabelSettings';

// colors
import { colors } from '../../data/colors';

/**
 * A modified NavItem, for rendering links to label pages.
 * @param {object} label - The associated label object.
 */
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

NavLabelItem.propTypes = {
  label: PropTypes.object.isRequired,
};

export default NavLabelItem;
