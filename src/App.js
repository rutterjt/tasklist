import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui imports
import { Box, Toolbar } from '@mui/material';

// components
import Header from './components/Header';
import Nav from './components/Nav';

// pages
import Home from './pages/Home';
import Today from './pages/Today';
import Tomorrow from './pages/Tomorrow';
import ListPage from './pages/ListPage';
import Completed from './pages/Completed';

// util components
import SaveToStorage from './components/SaveToStorage';

// store
import { useStore } from './store/context';
import { TOGGLE_NAV } from './store/actions';

// date and time utils
import { isPastDue } from './utils/time';
import { isDueToday } from './utils/time';
import { isDueTomorrow } from './utils/time';
import { isDueInFuture } from './utils/time';

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
            <Route
              path="/today"
              element={<Today list={list.filter(isDueToday)} />}
            />
            <Route
              path="/tomorrow"
              element={<Tomorrow list={list.filter(isDueTomorrow)} />}
            />
            <Route
              path="/upcoming"
              element={
                <ListPage
                  label="Upcoming"
                  list={list.filter(isDueInFuture)}
                  defaultItem={{}}
                />
              }
            />
            <Route
              path="/due"
              element={
                <ListPage
                  label="Past Due"
                  list={list.filter(isPastDue)}
                  defaultItem={{}}
                />
              }
            />
            <Route path="/completed" element={<Completed list={deleted} />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
