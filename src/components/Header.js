import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({ toggleNav, navOpen }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Toggle menu"
            sx={{ mr: 2 }}
            focusRipple
            onClick={toggleNav}
            sx={{ display: { md: 'none' } }}
          >
            {navOpen ? (
              <CloseIcon sx={{ display: { xs: 'block', md: 'none' } }} />
            ) : (
              <MenuIcon sx={{ display: { xs: 'block', md: 'none' } }} />
            )}
          </IconButton>
          <Typography variant="h6" component="h1" noWrap>
            To Do List
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '5rem' }} />
    </>
  );
};

export default Header;
