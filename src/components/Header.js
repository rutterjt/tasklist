import React from 'react';

// mui
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// store
import { useStore } from '../store/useStore';
import { TOGGLE_NAV } from '../store/actions';

const Header = () => {
  const { dispatch, navOpen } = useStore();

  const toggleNav = () => dispatch({ type: TOGGLE_NAV });

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
            sx={{ mr: 2, display: { md: 'none' } }}
            focusRipple
            onClick={toggleNav}
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
