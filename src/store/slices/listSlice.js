import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// lodash helpers
import { get } from 'lodash';

// unique ids
import { v4 as uuidv4 } from 'uuid';

// dates
import isDate from 'date-fns/isDate';

// helper functions
import { labelDeleted } from './labelsSlice';
import { sortByMethods } from '../../data/sortByMethods';

const listAdapter = createEntityAdapter();

const initialState = listAdapter.getInitialState({
  status: 'idle',
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
 * Returns a new, properly formatted task object.
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
    id: id ? id : uuidv4(),
    completed: false,
  };
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    taskCreated(state, action) {
      const task = createTask(action.payload);
      state.entities[task.id] = task;
    },
    taskUpdated(state, action) {
      const { id, data } = action.payload;
      state.entities[id] = {
        ...state.entities[id],
        ...data,
      };
    },
    taskCompleted(state, action) {
      const { id } = action.payload;
      state.entities[id].completed = true;
    },
    taskRestored(state, action) {
      const { id } = action.payload;
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

export const {
  taskCreated,
  taskUpdated,
  taskCompleted,
  taskRestored,
  completedDeleted,
} = listSlice.actions;

export default listSlice.reducer;

export const selectList = (state) => state.list;

export const selectTaskIds = (state) => Object.keys(selectList(state).entities);

export const selectSortedListByIds = (state) => {
  const newEntities = selectList(state).entities;
  const sortByMethod =
    sortByMethods[state.sortBy.name] || sortByMethods['default'];
  return Object.keys(newEntities.sort(sortByMethod));
};

export const selectTaskById = (state, id) => selectList(state).entities[id];

export const selectTaskIdsByFilter = (state, filter) => {
  const newEntities = selectList(state).entities;
  const keys = Object.keys(filter);
  const callback = (item) => {
    keys.forEach((key) => {
      if (!item[key] || item[key] !== newEntities[key]) return false;
    });
    return true;
  };
  return newEntities.filter(callback).map((task) => task.id);
};

export const selectTaskIdsByCallback = (state, callback) => {
  return selectList(state)
    .entities.filter(callback)
    .map((task) => task.id);
};

export const selectTaskIdsByLabel = (state, labelId) => {
  return selectList(state)
    .entities.filter((task) => task.label === labelId)
    .map((task) => task.id);
};

export const selectListAsList = (state) =>
  Object.values(selectList(state).entities);
