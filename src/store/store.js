import { configureStore } from '@reduxjs/toolkit';

import listReducer from './slices/listSlice';
import navReducer from './slices/navSlice';
import sortByReducer from './slices/sortBySlice';
import labelsReducer from './slices/labelsSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
    labels: labelsReducer,
    nav: navReducer,
    sortBy: sortByReducer,
  },
});

export default store;
