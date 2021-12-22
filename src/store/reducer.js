// unique ids
import { v4 as uuidv4 } from 'uuid';

// dates
import isDate from 'date-fns/isDate';

// action types
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  EMPTY_TRASH,
  TOGGLE_NAV,
  RESTORE_TASK,
  CLOSE_NAV,
  CHANGE_SORT_ORDER,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  ADD_TASK_AND_LABEL,
} from './actions';

// localstorage
const getItem = (name) => JSON.parse(localStorage.getItem(name)) || null;

// default state
export const defaultState = {
  list: getItem('list') || [],
  labels: getItem('labels') || [],
  deleted: getItem('deleted') || [],
  navOpen: false,
  sortBy: getItem('sortBy') || 'default',
};

// helper functions
const dueFormatted = (due) => {
  // correctly format due as date represented as number of miliseconds unix time, or undefined
  return isDate(due)
    ? due.getTime()
    : typeof due === 'number'
    ? due
    : undefined;
};

const getIndexFromId = (list, id) => {
  // returns the index of the list item with given id, or -1 if not found
  return list.findIndex((item) => item.id === id);
};

const createTask = ({ name, description, priority, due, label, date, id }) => {
  // returns a new task object with the given properties, filling in necessary properties if not supplied
  return {
    name,
    description,
    priority: priority || 4, // fallback to priority 4 if none specified
    due: dueFormatted(due),
    label,
    date: date ? date : Date.now(), // automatically get date of creation
    id: id ? id : uuidv4(),
  };
};

const createLabel = ({ name, color, id }) => {
  // returns a new label object with the given properties, filling in an id if not supplied
  return {
    name,
    color,
    id: id ? id : uuidv4(),
  };
};

const sliceList = (list, index, item) => {
  // accepts a list, index, and optional item, returns a new list with the item at the given index removed. If the third argument is provided, it will be added into the list at the given index.
  return item
    ? [...list.slice(0, index), item, ...list.slice(index + 1)]
    : [...list.slice(0, index), ...list.slice(index + 1)];
};

// reducer
export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // creates a new task and appends it to the list
    case ADD_TASK: {
      const newList = [...state.list, createTask(payload)];
      return { ...state, list: newList }; // add item to end of list
    }
    // finds the task with given payload.id, and updates it with payload.data
    case UPDATE_TASK: {
      const { id, data } = payload;
      const index = getIndexFromId(state.list, id);
      if (index < 0) return state; // don't change the state if the item is not in the list
      const oldTask = { ...state.list[index] };
      let updatedItem = { ...oldTask, ...data }; // get all properties of original item, replace with any conflicting properties in payload data
      const newList = sliceList(state.list, index, updatedItem);
      return { ...state, list: newList };
    }
    case DELETE_TASK: {
      // getting the index of the item to delete
      const index = getIndexFromId(state.list, payload);
      if (index < 0) return state; // don't delete if item doesn't exist
      const task = { ...state.list[index] };
      const newDeleted = [task, ...state.deleted].slice(0, 10); // push deleted item to the trash, slicing trash to 10 items
      const newList = sliceList(state.list, index);
      return { ...state, list: newList, deleted: newDeleted };
    }
    case RESTORE_TASK: {
      const index = getIndexFromId(state.deleted, payload);
      if (index < 0) return state;
      const task = createTask(state.deleted[index]);
      const newDeleted = sliceList(state.deleted, index);
      const newList = [...state.list, task];
      return { ...state, list: newList, deleted: newDeleted };
    }
    case EMPTY_TRASH: {
      return { ...state, deleted: [] };
    }
    case CHANGE_SORT_ORDER: {
      return { ...state, sortBy: payload };
    }
    case TOGGLE_NAV: {
      return { ...state, navOpen: !state.navOpen };
    }
    case CLOSE_NAV: {
      return { ...state, navOpen: false };
    }
    case ADD_LABEL: {
      const label = createLabel(payload);
      const newLabels = [...state.labels, label];
      return { ...state, labels: newLabels };
    }
    case UPDATE_LABEL: {
      let { old, update } = payload;
      const index = getIndexFromId(state.labels, old.id);
      if (index < 0) return state;
      const label = { ...old, ...update };
      const newLabels = sliceList(state.labels, index, label);
      return { ...state, labels: newLabels };
    }
    case DELETE_LABEL: {
      const index = state.labels.indexOf(payload);
      if (index < 0) return state;
      const newLabels = sliceList(state.labels, index);
      return { ...state, labels: newLabels };
    }
    case ADD_TASK_AND_LABEL: {
      const { task, label } = payload;
      const newLabel = createLabel(label);
      const newTask = createTask({ ...task, label: newLabel });
      const newLabels = [...state.labels, newLabel];
      const newList = [...state.tasks, newTask];
      return { ...state, labels: newLabels, list: newList };
    }
    default: {
      console.warn('Unknown action type');
      return state;
    }
  }
};
