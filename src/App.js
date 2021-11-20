import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui imports
import { Box, Toolbar } from '@mui/material';

// components
import Header from './components/Header';
import Nav from './components/Nav';

// pages
import Home from './pages/Home';

// store
import { useStoreContext } from './store/context';
import { TOGGLE_NAV } from './store/actions';

const App = () => {
  const { list, trash, navOpen, dispatch } = useStoreContext();

  const toggleNav = () => {
    dispatch({ type: TOGGLE_NAV });
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header toggleNav={toggleNav} navOpen={navOpen} />
        <Nav toggleNav={toggleNav} navOpen={navOpen} />
        <Box component="main">
          {/* Toolbar provides spacing under Header */}
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home list={list} />} />
            <Route path="/today" element={<Home />} />
            <Route path="/upcoming" element={<Home />} />
            <Route path="/due" element={<Home />} />
            <Route path="/completed" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
