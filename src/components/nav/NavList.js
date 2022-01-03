import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { List } from '@mui/material';

// components
import NavItem from './NavItem';

// store
import { useStore } from '../../store/useStore';

/**
 * Renders a list of nav items.
 * @param {array} navList - An array of nav links, each to be rendered as a <NavItem> component.
 */
const NavList = ({ navList }) => {
  const { list } = useStore();

  return (
    <List sx={{ pt: 0 }}>
      {navList.map((item, index) => {
        const { title, to, listCallback, icon } = item;
        if (title === 'Past Due' && !list.filter(listCallback).length)
          return null;
        return (
          <NavItem
            key={index}
            title={title}
            to={to}
            list={list.filter(listCallback)}
            icon={icon}
          />
        );
      })}
    </List>
  );
};

NavList.propTypes = {
  navList: PropTypes.array.isRequired,
};

export default NavList;
