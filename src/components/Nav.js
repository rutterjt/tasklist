import React from 'react';
import { Box, Drawer, List, Toolbar, Divider } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

// data
import { navItems } from '../data';

// components
import NavItem from './NavItem';
import NavLabelsList from './NavLabelsList';

// store
import { useStore } from '../store/useStore';
import { TOGGLE_NAV } from '../store/actions';

const drawerWidth = 240;

const NavList = ({ list }) => (
  <Box component="nav">
    <Toolbar />
    <List>
      {navItems.map((item, index) => {
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
    <Divider />
    <NavLabelsList />
    <Divider />
    <List>
      <NavItem
        title="Completed"
        list={[]}
        to="/completed"
        icon={<DeleteIcon fontSize="small" />}
      />
    </List>
  </Box>
);

const Nav = () => {
  const { dispatch, navOpen, list } = useStore();
  const toggleNav = () => dispatch({ type: TOGGLE_NAV });

  const container = window.document.body;

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="To do list folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={navOpen}
        onClose={toggleNav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <NavList list={list} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <NavList list={list} />
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default Nav;
