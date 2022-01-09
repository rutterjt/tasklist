import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// routing
import { useLocation } from 'react-router-dom';

// mui
import { ListItemButton } from '@mui/material';

// hooks
import { useRenderLink } from '../../hooks/useRenderLink';

/**
 * Renders a React Router link as a MUI ListItemButton, for use as a navigation link.
 * @param {string} to - The link href, passed to the <Link> component.
 * @param {any} children - Any NavItem elements that should be rendered inside the Link.
 */
const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const renderLink = useRenderLink(to);

  return (
    <ListItemButton component={renderLink} selected={pathname === to}>
      {children}
    </ListItemButton>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLink;
