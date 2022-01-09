import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  name: 'default',
};

const sortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    sortByUpdated(state, action) {
      state.name = action.payload;
    },
  },
});

export const { sortByUpdated } = sortBySlice.actions;

export default sortBySlice.reducer;

export const selectSortByName = (state) => state.sortBy.name;
