import React from 'react';

// mui
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// store
import { useStore } from '../store/useStore';
import { TOGGLE_NAV } from '../store/actions';

// images
import Logo from '../images/logo.svg';

const Header = () => {
  const { dispatch, navOpen } = useStore();

  const toggleNav = () => dispatch({ type: TOGGLE_NAV });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={Logo}
              alt="TaskList Logo"
              sx={{
                mr: 2,
                width: { xs: 25, sm: 40 },
                height: { xs: 25, sm: 40 },
              }}
            />
            <Typography
              component="h1"
              noWrap
              sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}
            >
              TaskList
            </Typography>
          </Box>
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
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '5rem' }} />
    </>
  );
};

export default Header;
