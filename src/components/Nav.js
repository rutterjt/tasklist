import React from 'react';
import { Box, Drawer, List, Toolbar, Divider } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

// data
import { navItems } from '../data';

// components
import NavItem from './NavItem';

const drawerWidth = 240;

const Nav = ({ window, toggleNav, navOpen, list }) => {
  const NavList = () => (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item, index) => {
          if (item.title === 'Past Due' && !item.list.length) return null;
          return <NavItem key={index} {...item} />;
        })}
      </List>
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        <NavList />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <NavList />
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default Nav;
