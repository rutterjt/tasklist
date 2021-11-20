import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Badge,
  ListItemButton,
  Divider,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

// data
import { navItems } from '../data';

const drawerWidth = 240;

const Nav = ({ window, toggleNav, navOpen }) => {
  const [activeList, setActiveList] = useState(0);

  const handleClick = (value) => {
    setActiveList(value);
  };

  const NavItem = ({ title, list, icon, index }) => (
    <ListItem selected={activeList === index}>
      <ListItemButton onClick={() => handleClick(index)} disableRipple>
        <ListItemIcon>
          <Badge
            badgeContent={list.length}
            color={title === 'Past Due' ? 'error' : 'secondary'}
          >
            {icon}
          </Badge>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );

  const NavList = (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item, index) => {
          if (item.title === 'Past Due' && !item.list.length) return null;
          return <NavItem key={index} {...item} index={index} />;
        })}
      </List>
      <Divider />
      <List>
        <NavItem
          title="Completed"
          list={[]}
          icon={<DeleteIcon fontSize="small" />}
          index={navItems.length + 1}
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
        {NavList}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {NavList}
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default Nav;
