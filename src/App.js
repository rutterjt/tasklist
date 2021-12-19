import React from 'react';

// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui imports
import { Box, Toolbar } from '@mui/material';

// pages
import Home from './pages/Home';
import Today from './pages/Today';
import Tomorrow from './pages/Tomorrow';
import Completed from './pages/Completed';
import PastDue from './pages/PastDue';
import Upcoming from './pages/Upcoming';

// components
import Header from './components/Header';
import Nav from './components/Nav';

// util components
import SaveToStorage from './components/SaveToStorage';
import PageChange from './components/PageChange';

const App = () => (
  <Router>
    <Box sx={{ display: 'flex' }}>
      <SaveToStorage />
      <PageChange />
      <Header />
      <Nav />
      <Box component="main" sx={{ width: '100%', maxWidth: '500px' }}>
        {/* Toolbar provides spacing under Header */}
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/tomorrow" element={<Tomorrow />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/due" element={<PastDue />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </Box>
    </Box>
  </Router>
);

export default App;
