import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui imports
import { Box, Toolbar } from '@mui/material';

// components
import Header from './components/Header';
import Nav from './components/Nav';
import ToDoList from './components/ToDoList';
import ToDoItem from './components/ToDoItem';

// pages
import Home from './pages/Home';

// dummy data
import { defaultList } from './data';

const App = () => {
  const [list, setList] = useState(defaultList);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <Nav handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
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
