import {
  createEntityAdapter,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

// unique ids
import { nanoid } from 'nanoid';

import { RootState } from '../../app/store';

export type IncompleteLabel = {
  name: string;
  color: string;
};

export type Label = IncompleteLabel & {
  id: string;
};

const labelsAdapter = createEntityAdapter<Label>();

// default state
const initialState = labelsAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | undefined | null,
});

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    labelCreated: {
      prepare: ({ name, color }: IncompleteLabel) => {
        return { payload: { name, color, id: nanoid() } };
      },
      reducer: (state, action: PayloadAction<Label>) => {
        labelsAdapter.addOne(state, action.payload);
      },
    },
    labelUpdated(state, action: PayloadAction<Label>) {
      labelsAdapter.upsertOne(state, action.payload);
    },
    labelDeleted(state, action: PayloadAction<string>) {
      labelsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { labelCreated, labelUpdated, labelDeleted } = labelsSlice.actions;

export default labelsSlice.reducer;

// selectors
export const selectLabels = (state: RootState) => state.labels;
export const {
  selectIds: selectLabelIds,
  selectById: selectLabelById,
  selectEntities: selectLabelEntities,
} = labelsAdapter.getSelectors(selectLabels);

// TODO: Fix this selector
export const selectLabelIdByName = (state: RootState, id: string) => {
  return selectLabels(state).entities?.[id]?.name;
};

export const selectLabelsAsArray = createSelector(
  selectLabelEntities,
  (entities) => Object.values(entities)
);
