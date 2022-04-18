import React from 'react';

// mui
import { Box, Drawer, Divider, List } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import DeleteIcon from '@mui/icons-material/Delete';

// redux
import { useDispatch, useSelector } from 'react-redux';

// components
import { Spacebar } from '../../components';
import NavLabelsList from './NavLabelsList';
import NavItem from './NavItem';

import {
  isDueToday,
  isDueTomorrow,
  isDueInFuture,
  isPastDue,
} from '../../utils/time';

// store
import { navToggled, selectNavOpen } from './navSlice';

/**
 * Renders the nav drawer, which displays as a slide-in drawer on mobile, or a permanent drawer on medium screens.
 */
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
      {/* temporary slide-in nav drawer: displays on small screens */}
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
      {/* permanent nav drawer: displays on medium screens */}
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
const Nav = () => (
  <NavDrawer>
    <Box>
      <Spacebar />
      <List sx={{ pt: 0 }}>
        <NavItem
          title="All Tasks"
          to="/"
          filter={() => true}
          icon={<InboxIcon fontSize="small" />}
        />
        <NavItem
          title="Today"
          to="/today"
          filter={isDueToday}
          icon={<TodayIcon fontSize="small" />}
        />
        <NavItem
          title="Tomorrow"
          to="/tomorrow"
          filter={isDueTomorrow}
          icon={<UpcomingIcon fontSize="small" />}
        />
        <NavItem
          title="Upcoming"
          to="/upcoming"
          filter={isDueInFuture}
          icon={<EventNoteIcon fontSize="small" />}
        />
        <NavItem
          title="Past Due"
          to="/due"
          filter={isPastDue}
          icon={<ScheduleIcon fontSize="small" />}
        />
      </List>
      <Divider />
      <NavLabelsList />
      <Divider />
      <List sx={{ pt: 0 }}>
        <NavItem
          title="Completed"
          to="/completed"
          filter={() => false}
          icon={<DeleteIcon fontSize="small" />}
        />
      </List>
    </Box>
  </NavDrawer>
);

export default Nav;
