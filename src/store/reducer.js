// unique ids
import { v4 as uuidv4 } from 'uuid';

// dates
import isDate from 'date-fns/isDate';

// lodash helpers
import { get } from 'lodash';

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
 * Finds the list item with the specified id, or -1 if not found.
 * @param {Array} list - An array.
 * @param {string} id - A unique id.
 * @return {Number} The index of the array item with the given id, or -1 if not found.
 *
 */
const getIndexFromId = (list, id) => {
  return list.findIndex((item) => item.id === id);
};

// create label typedef

/**
 * @typedef label
 * @type {object}
 * @property {string} name - The label's name.
 * @property {string} [color] - The label's color, stored as a string descriptor, which is a key in the colors object exported from /src/data/colors.js.
 * @property {string} [id] - The label's unique id, automatically generated.
 */

/**
 * @typedef task
 * @type {object}
 * @property {string} name - The task's name.
 * @property {string} [description] - The task's description.
 * @property {number} [priority] - The task's priority: accepts 1-4.
 * @property {number} [due] - The task's due date, in miliseconds unix time.
 * @property {number} [date] - The task's creation date, in miliseconds unix time.
 * @property {label} [label] - A label reference.
 * @property {string} [id] - The task's unique id.
 */

/**
 * Returns a new, properly formatted task object.
 * @param {task} task - A partially complete task object.
 * @return {task} A complete task object.
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
  };
};

/**
 * Returns a new, properly formatted label object.
 * @param {label} label - A label object, which may be incomplete.
 * @return {Object} A correctly formatted label object, with a unique id.
 */
const createLabel = ({ name, color, id }) => {
  return {
    name,
    color,
    id: id ? id : uuidv4(),
  };
};

/**
 * Returns a copy of the given list, with the item at the given index removed, and optionally replaced with a new item.
 *
 * Does not mutate the original list.
 *
 * @param {Array} list - A list of tasks.
 * @param {Number} index - A list index.
 * @param {Object} [item] - (Optional) a new list item.
 * @return {Array} A copy of list with list[index] removed, and optionally replaced with item.
 */
const sliceList = (list, index, item) => {
  return item
    ? [...list.slice(0, index), item, ...list.slice(index + 1)]
    : [...list.slice(0, index), ...list.slice(index + 1)];
};

/**
 * Returns true or false whether a task has a given label.
 * @param {Object} label A label object.
 * @param {Object} task A task object.
 * @return {Boolean} Whether task.label.id === label.id.
 */
const matchLabel = (label, task) => get(task, 'label.id') === label.id;

/**
 * Updates a task's label.
 * @param {Object|undefined} newLabel A label object, or undefined
 * @param {Object} task A task object.
 * @return {Object} The given task object with its label property set to newLabel.
 */
const updateTaskLabel = (newLabel, task) => ({ ...task, label: newLabel });

/**
 * Clears a task's label.
 * @param {Object} task A task object.
 * @return {Object} The task object with label property set to undefined.
 */
const clearTaskLabel = (task) => updateTaskLabel(undefined, task);

/**
 * Updates all references to a label in a task list.
 * @param {Array} list An array of task objects.
 * @param {Object} oldLabel The old label.
 * @param {Object} newLabel The new label.
 * @return {Array} A new list, with all references to oldLabel replaced with newLabel.
 */
const updateLabels = (list, oldLabel, newLabel) => {
  return list.map((task) =>
    matchLabel(oldLabel, task) ? updateTaskLabel(newLabel, task) : task
  );
};

/**
 * Returns a copy of a list with all references to the label removed.
 * @param {Array} list An array of task objects.
 * @param {Object} label A label object.
 * @return {Array} An array of task objects with references to the label removed.
 */
const purgeLabel = (list, label) => {
  return list.map((task) =>
    matchLabel(label, task) ? clearTaskLabel(task) : task
  );
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
    // creates a new label
    // payload: { label: {name, color} }
    case ADD_LABEL: {
      const label = createLabel(payload.label);
      const newLabels = [...state.labels, label];
      return { ...state, labels: newLabels };
    }
    // updates an existing label, and updates the task list with the new label
    // payload: { old: {name, color, id}, update: {name, color} }
    case UPDATE_LABEL: {
      let { old, update } = payload;
      const index = getIndexFromId(state.labels, old.id);
      if (index < 0) return state;
      const label = { ...old, ...update };
      // insert new label into labels array
      const newLabels = sliceList(state.labels, index, label);
      // update task list by updating tasks with new label
      const newList = updateLabels(state.list, state.labels[index], label);
      const newDeleted = updateLabels(
        state.deleted,
        state.labels[index],
        label
      );
      return {
        ...state,
        labels: newLabels,
        list: newList,
        deleted: newDeleted,
      };
    }
    // deletes an existing label, and updates the task list by deleting all references to the old label
    // payload: { label: name, color, id }
    case DELETE_LABEL: {
      const { label } = payload;
      const index = getIndexFromId(state.labels, label.id);
      if (index < 0) return state;
      const newLabels = sliceList(state.labels, index);
      const newList = purgeLabel(state.list, label);
      const newDeleted = purgeLabel(state.deleted, label);
      return {
        ...state,
        labels: newLabels,
        list: newList,
        deleted: newDeleted,
      };
    }
    default: {
      console.warn('Unknown action type');
      return state;
    }
  }
};
