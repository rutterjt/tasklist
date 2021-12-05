import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui imports
import { Box, Toolbar } from '@mui/material';

// components
import Header from './components/Header';
import Nav from './components/Nav';

// pages
import Home from './pages/Home';
import Completed from './pages/Completed';

// util components
import SaveToStorage from './components/SaveToStorage';

// store
import { useStore } from './store/context';
import { TOGGLE_NAV } from './store/actions';

const App = () => {
  const { list, deleted, navOpen, dispatch } = useStore();
  console.log(list);

  const toggleNav = () => {
    dispatch({ type: TOGGLE_NAV });
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <SaveToStorage />
        <Header toggleNav={toggleNav} navOpen={navOpen} />
        <Nav toggleNav={toggleNav} navOpen={navOpen} list={list} />
        <Box component="main" sx={{ width: '100%', maxWidth: '500px' }}>
          {/* Toolbar provides spacing under Header */}
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home list={list} />} />
            <Route path="/today" element={<Home />} />
            <Route path="/upcoming" element={<Home />} />
            <Route path="/due" element={<Home />} />
            <Route path="/completed" element={<Completed list={deleted} />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
