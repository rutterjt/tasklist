import React from 'react';

// mui
import { List } from '@mui/material';

// components
import NavItem from './NavItem';

// store
import { useStore } from 'store/useStore';

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

export default NavList;
