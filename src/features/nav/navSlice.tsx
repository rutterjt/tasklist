import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

const initialState = { open: false };

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    navOpened(state) {
      state.open = true;
    },
    navClosed(state) {
      state.open = false;
    },
    navToggled(state) {
      state.open = !state.open;
    },
  },
});

export const { navOpened, navClosed, navToggled } = navSlice.actions;

export default navSlice.reducer;

export const selectNavOpen = (state: RootState) => state.nav.open;
