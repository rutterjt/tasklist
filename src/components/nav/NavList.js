import React from 'react';

// redux
import { useSelector } from 'react-redux';

// proptypes
import PropTypes from 'prop-types';

// mui
import { List } from '@mui/material';

// components
import NavItem from './NavItem';

// store
import { selectListAsList } from '../../store/slices/listSlice';

/**
 * Renders a list of nav items.
 * @param {array} navList - An array of nav links, each to be rendered as a <NavItem> component.
 */
const NavList = ({ navList }) => {
  const list = useSelector(selectListAsList);

  const listContents = navList.map((item, index) => {
    const { title, to, listCallback, icon } = item;
    if (title === 'Past Due' && !list.filter(listCallback).length) return null;
    return (
      <NavItem
        key={index}
        title={title}
        to={to}
        list={list.filter(listCallback)}
        icon={icon}
      />
    );
  });

  return <List sx={{ pt: 0 }}>{listContents}</List>;
};

NavList.propTypes = {
  navList: PropTypes.array.isRequired,
};

export default NavList;
