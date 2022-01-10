import { configureStore } from '@reduxjs/toolkit';

import listReducer from './slices/listSlice';
import navReducer from './slices/navSlice';
import sortByReducer from './slices/sortBySlice';
import labelsReducer from './slices/labelsSlice';

import { loadState } from './localStorage';

const loadedState = loadState();

const preloadedState = {
  list: loadedState ? loadedState.list : undefined,
  labels: loadedState ? loadedState.labels : undefined,
};

const store = configureStore({
  reducer: {
    list: listReducer,
    labels: labelsReducer,
    nav: navReducer,
    sortBy: sortByReducer,
  },
  preloadedState,
});

export default store;
