import React from 'react';

// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui imports
import { Box } from '@mui/material';

// pages
import {
  Home,
  Today,
  Tomorrow,
  Completed,
  PastDue,
  Upcoming,
  Label,
} from './pages';

// components
import { Header, PageChange } from './components';
import Nav from './features/nav/Nav';

const App = () => (
  <Router>
    <Box sx={{ display: 'flex' }}>
      <PageChange />
      <Header />
      <Nav />
      <Box component="main" sx={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/tomorrow" element={<Tomorrow />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/due" element={<PastDue />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/label/:label" element={<Label />} />
        </Routes>
      </Box>
    </Box>
  </Router>
);

export default App;
