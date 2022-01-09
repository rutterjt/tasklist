import { createSlice } from '@reduxjs/toolkit';

const initialState = { status: 'idle', open: false };

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    navOpened(state, action) {
      state.open = true;
    },
    navClosed(state, action) {
      state.open = false;
    },
    navToggled(state, action) {
      state.open = !state.open;
    },
  },
});

export const { navOpened, navClosed, navToggled } = navSlice.actions;

export default navSlice.reducer;

export const selectNavOpen = (state) => state.nav.open;
