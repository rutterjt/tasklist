import { v4 as uuidv4 } from 'uuid';

import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  EMPTY_TRASH,
  TOGGLE_NAV,
  RESTORE_ITEM,
} from './actions';

// export const defaultState = {
//   list: JSON.parse(localStorage.getItem('list')) || [],
//   deleted: JSON.parse(localStorage.getItem('deleted')) || [],
//   navOpen: false,
// };

export const defaultState = {
  list: [],
  trash: [],
  navOpen: false,
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM: {
      const { name, description, priority, due, label } = payload;
      const newItem = {
        name: name || '', // for each property, fallback to empty string if value not in payload
        description: description || '',
        priority: priority || 4,
        due: due || null,
        label: label || '',
        deleted: false,
        date: new Date(), // automatically get date of creation
        id: uuidv4(), // automatically generate a unique id
      };
      return { ...state, list: [...state.list, newItem] }; // add item to end of list
    }
    case UPDATE_ITEM: {
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
    case DELETE_ITEM: {
      // getting the index of the item to delete
      const index = state.list.findIndex((item) => item.id === payload);
      if (index < 0) return state; // don't delete if item doesn't exist
      const item = { ...state.list[index], deleted: true };
      const newTrash = [item, ...state.trash].slice(0, 10); // push deleted item to the trash, slicing trash to 10 items
      const newList = state.list
        .slice(0, index)
        .concat(state.list.slice(index + 1)); // slice list to remove deleted item
      return { ...state, list: newList, trash: newTrash };
    }
    case RESTORE_ITEM: {
      const index = state.trash.findIndex((item) => item.id === payload);
      if (index < 0) return state;
      const item = { ...state.trash[index], deleted: false };
      const newTrash = state.trash
        .slice(0, index)
        .concat(state.trash.slice(index + 1)); // slice list to remove deleted item
      const newList = [...state.list, item];
      return { ...state, list: newList, trash: newTrash };
    }
    case EMPTY_TRASH: {
      return { ...state, trash: [] };
    }
    case TOGGLE_NAV: {
      return { ...state, navOpen: !state.navOpen };
    }
    default: {
      console.warn('Unknown action type');
      return state;
    }
  }
};
