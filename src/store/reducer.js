import { v4 as uuidv4 } from 'uuid';

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

// date-fns
import isDate from 'date-fns/isDate';

const getItem = (name) => JSON.parse(localStorage.getItem(name)) || null;

export const defaultState = {
  list: getItem('list') || [],
  labels: getItem('labels') || [],
  deleted: getItem('deleted') || [],
  navOpen: false,
  sortBy: getItem('sortBy') || 'default',
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK: {
      const { name, description, priority, due, label } = payload;
      // correctly format due as date represented as number of miliseconds unix time, or undefined
      let dueFormatted = isDate(due)
        ? due.getTime()
        : typeof due === 'number'
        ? due
        : undefined;
      const newItem = {
        name: name,
        description: description,
        priority: priority || 4, // fallback to priority 4 if none specified
        due: dueFormatted,
        label: label,
        deleted: false,
        date: Date.now(), // automatically get date of creation
        id: uuidv4(), // automatically generate a unique id
      };
      const newList = [...state.list, newItem];
      return { ...state, list: newList }; // add item to end of list
    }
    case UPDATE_TASK: {
      const { id, data } = payload;
      // getting the index of the item in the current list
      const index = state.list.findIndex((item) => item.id === id);
      if (index < 0) return state; // don't change the state if the item is not in the list
      const oldItem = state.list[index];
      let updatedItem = { ...oldItem, ...data }; // get all properties of original item, replace with any conflicting properties in payload data
      const newList = state.list
        .slice(0, index)
        .concat(updatedItem)
        .concat(state.list.slice(index + 1)); // construct new list by inserting the updated item in the original index slot
      return { ...state, list: newList };
    }
    case DELETE_TASK: {
      // getting the index of the item to delete
      const index = state.list.findIndex((item) => item.id === payload);
      if (index < 0) return state; // don't delete if item doesn't exist
      const item = { ...state.list[index] };
      const newDeleted = [item, ...state.deleted].slice(0, 10); // push deleted item to the trash, slicing trash to 10 items
      const newList = state.list
        .slice(0, index)
        .concat(state.list.slice(index + 1)); // slice list to remove deleted item
      return { ...state, list: newList, deleted: newDeleted };
    }
    case RESTORE_TASK: {
      const index = state.deleted.findIndex((item) => item.id === payload);
      if (index < 0) return state;
      const item = { ...state.deleted[index] };
      const newDeleted = state.deleted
        .slice(0, index)
        .concat(state.deleted.slice(index + 1)); // slice list to remove deleted item
      const newList = [...state.list, item];
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
      const newLabel = {
        name: payload.name,
        color: payload.color || '',
        id: uuidv4(), // automatically generate a unique id
      };
      const newLabels = [...state.labels, newLabel];
      return { ...state, labels: newLabels };
    }
    case UPDATE_LABEL: {
      let { old, update } = payload;
      const index = state.labels.indexOf(old);
      if (index < 0) return state;
      const newLabels = state.labels
        .slice(0, index)
        .concat(update)
        .concat(state.labels.slice(index + 1));
      return { ...state, labels: newLabels };
    }
    case DELETE_LABEL: {
      const index = state.labels.indexOf(payload);
      if (index < 0) return state;
      const newLabels = state.labels
        .slice(0, index)
        .concat(state.labels.slice(index + 1));
      return { ...state, labels: newLabels };
    }
    default: {
      console.warn('Unknown action type');
      return state;
    }
  }
};
