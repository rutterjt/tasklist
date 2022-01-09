import { createSlice } from '@reduxjs/toolkit';

// unique ids
import { v4 as uuidv4 } from 'uuid';

// default state
const initialState = { status: 'idle', entities: {} };

/**
 * Returns a new, properly formatted label object.
 * @param {object} label - A label object, which may be incomplete.
 * @return {object} A correctly formatted label object, with a unique id.
 */
const createLabel = ({ name, color, id }) => {
  return {
    name,
    color,
    id: id ? id : uuidv4(),
  };
};

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    labelCreated(state, action) {
      const newLabel = createLabel(action.payload);
      state.entities[newLabel.id] = newLabel;
    },
    labelUpdated(state, action) {
      const { id, data } = action.payload;
      state.entities[id] = { ...state.entities[id], ...data };
    },
    labelDeleted(state, action) {
      delete state.entities[action.payload.id];
    },
  },
});

export const { labelCreated, labelUpdated, labelDeleted } = labelsSlice.actions;

export default labelsSlice.reducer;

// selectors

export const selectLabels = (state) => state.labels;

export const selectLabelIds = (state) =>
  Object.keys(selectLabels(state).entities);

export const selectLabelById = (state, id) => {
  return selectLabels(state).entities[id];
};

export const selectLabelsAsList = (state) =>
  Object.values(selectLabels(state).entities);

export const selectLabelIdByName = (state, id) => {
  return selectLabels(state).entities[id].name;
};
