import React from 'react';

// mui
import { Box, Drawer, Divider } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';

// data
import { navItems, completed } from '../../data/nav';

// components
import NavLabelsList from './NavLabelsList';
import Spacebar from '../Spacebar';
import NavList from './NavList';

// store
import { navToggled, selectNavOpen } from '../../store/slices/navSlice';

const NavDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const navOpen = useSelector(selectNavOpen);
  const toggleNav = () => dispatch(navToggled());

  const drawerWidth = 240;
  const container = window.document.body;
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="navigation"
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
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {children}
      </Drawer>
    </Box>
  );
};

/**
 * Renders the site navigation.
 */
const Nav = () => {
  return (
    <NavDrawer>
      <Box>
        <Spacebar />
        <NavList navList={navItems} />
        <Divider />
        <NavLabelsList />
        <Divider />
        <NavList navList={completed} />
      </Box>
    </NavDrawer>
  );
};

export default Nav;
