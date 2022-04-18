import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '../features/tasks/tasksSlice';
import labelsReducer from '../features/labels/labelsSlice';
import navReducer from '../features/nav/navSlice';

import { loadState } from './localStorage';

const preloadedState = loadState();

const reducer = {
  tasks: tasksReducer,
  labels: labelsReducer,
  nav: navReducer,
};

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
