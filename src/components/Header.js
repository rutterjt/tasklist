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

// routing
import { Link } from 'react-router-dom';

// store
import { useStore } from '../store/useStore';
import { TOGGLE_NAV } from '../store/actions';

// images
import Logo from '../images/logo.svg';

// components
import TaskCreateDialog from './TaskCreateDialog';

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
                width: { xs: 24, sm: 36 },
                height: { xs: 24, sm: 36 },
              }}
            />
            <Typography
              component="h1"
              noWrap
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                TaskList
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TaskCreateDialog />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Toggle menu"
              sx={{ display: { md: 'none' }, ml: 2 }}
              focusRipple
              onClick={toggleNav}
            >
              {navOpen ? (
                <CloseIcon sx={{ display: { xs: 'block', md: 'none' } }} />
              ) : (
                <MenuIcon sx={{ display: { xs: 'block', md: 'none' } }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '5rem' }} />
    </>
  );
};

export default Header;
