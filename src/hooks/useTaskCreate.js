import { useState } from 'react';

// lodash helpers
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// store
import { useStore } from '../store/useStore';
import { ADD_TASK } from '../store/actions';

/**
 * Custom hook to handle state management for task creation forms.
 *
 * @param {object} [defaultItem={}] - Default form data, injected into the initial form data state if provided.
 */
export const useTaskCreate = (defaultItem) => {
  const { dispatch } = useStore();
  const [data, setData] = useState(defaultItem ? { ...defaultItem } : {});

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_TASK,
      payload: { ...data },
    };
  };

  /**
   * Submits the form data with a dispatch to the store, and clears the old form data.
   * @return {undefined}
   */
  const submit = () => {
    dispatch(itemCreator(data));
    setData(defaultItem);
  };

  /**
   * Returns true or false whether the form is empty (other than the default form data).
   * @return {boolean} Whether the form is empty.
   */
  const isFormEmpty = () => {
    return !isEmpty(data) && !isEqual(data, defaultItem);
  };

  /**
   * Returns true or false whether the form's data is valid and can be submitted.
   * @return {boolean} Whether the form data is valid.
   */
  const isValid = () => {
    return !isFormEmpty && data.name;
  };

  return { data, setter: setData, submit, isEmpty: isFormEmpty, isValid };
};
