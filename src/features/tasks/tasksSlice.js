import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

// lodash helpers
import { get } from 'lodash';

// unique ids
import { nanoid } from 'nanoid';

// dates
import isDate from 'date-fns/isDate';

// helper functions
import { labelDeleted } from '../labels/labelsSlice';
import { sortByMethods } from '../../data/sortByMethods';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: 'idle',
  error: false,
});

/**
 * Converts the given input into the number of seconds unix time, or undefined if the input cannot be converted.
 * @param {Any} due - The value to format: should ideally be a date object.
 * @return {Number|undefined} The input value converted to miliseconds unix time, or else undefined.
 */
const dueFormatted = (due) => {
  return isDate(due)
    ? due.getTime()
    : typeof due === 'number'
    ? due
    : undefined;
};

/**
 * Returns a new, correctly formatted task object.
 * @param {object} task - A partially complete task object.
 * @return {object} A complete task object.
 */
const createTask = ({ name, description, priority, due, label, date, id }) => {
  return {
    name,
    description,
    priority: priority || 4, // fallback to priority 4 if none specified
    due: dueFormatted(due),
    label,
    date: date ? date : Date.now(), // automatically get date of creation
    id: id ? id : nanoid(),
    completed: false,
  };
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskCreated: {
      prepare: (task) => {
        console.log(task);
        return { payload: createTask(task) };
      },
      reducer: (state, action) => {
        tasksAdapter.addOne(state, action.payload);
      },
    },
    taskUpdated(state, action) {
      tasksAdapter.upsertOne(state, action.payload);
    },
    taskCompleted(state, action) {
      const id = action.payload;
      state.entities[id].completed = true;
    },
    taskRestored(state, action) {
      const id = action.payload;
      state.entities[id].completed = false;
    },
    completedDeleted(state, action) {
      Object.values(state.entities).forEach((task) => {
        if (task.completed) {
          delete state.entities[task.id];
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(labelDeleted, (state, action) => {
      Object.values(state.entities).forEach((task) => {
        if (get(task.label.id) === action.payload) {
          delete state.entities[task.id].label;
        }
      });
    });
  },
});

export default tasksSlice.reducer;

export const {
  taskCreated,
  taskUpdated,
  taskCompleted,
  taskRestored,
  completedDeleted,
} = tasksSlice.actions;

export const selectTasks = (state) => state.tasks;
export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectById: selectTaskById,
} = tasksAdapter.getSelectors(selectTasks);

export const selectSortedListByIds = (state) => {
  const newEntities = selectTasks(state).entities;
  const sortByMethod =
    sortByMethods[state.sortBy.name] || sortByMethods['default'];
  return Object.keys(newEntities.sort(sortByMethod));
};

export const selectTaskIdsByFilter = (state, filter) => {
  const keys = Object.keys(filter);
  const callback = (item) => {
    keys.forEach((key) => {
      if (!item[key] || item[key] !== filter[key]) return false;
    });
    return true;
  };
  return Object.keys(selectTasks(state).entities)
    .filter(callback)
    .map((task) => task.id);
};

export const selectTaskIdsByCallback = (state, callback) => {
  return selectTasks(state)
    .filter(callback)
    .map((task) => task.id);
};

export const selectTaskIdsByLabel = createSelector(
  selectTasks,
  (state, labelId) => labelId,
  (tasks, labelId) =>
    tasks.filter((task) => task.label === labelId).map((task) => task.id)
);

export const selectBadgeContent = createSelector(
  selectTaskEntities,
  (state, filter) => filter,
  (entities, filter) => Object.values(entities).filter(filter).length
);
