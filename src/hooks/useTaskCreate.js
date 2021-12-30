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
 * Returns:
 *
 * data: the form data
 *
 * setter: a setter for the data
 *
 * submit: dispatches the form data to the store
 *
 * isEmpty: returns whether the form data is empty (or just the default data)
 *
 * isValid: returns whether the form is valid
 *
 * @param {object} [defaultItem={}] - Default form data, injected into the initial form data state if provided.
 *
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

  const close = () => setData({ ...defaultItem });

  /**
   * Submits the form data with a dispatch to the store, and clears the old form data.
   * @return {undefined}
   */
  const submit = () => {
    dispatch(itemCreator(data));
    close();
  };

  /**
   * Returns true or false whether the form is empty (other than the default form data).
   * @return {boolean} True if form is empty or equal to default form data, false otherwise.
   */
  const isFormEmpty = () => {
    return isEmpty(data) || isEqual(data, defaultItem);
  };

  /**
   * Returns true or false whether the form's data is valid and can be submitted.
   * @return {boolean} Whether the form data is valid.
   */
  const isValid = () => {
    return !isFormEmpty() && data.name;
  };

  return {
    data,
    setter: setData,
    submit,
    isEmpty: isFormEmpty,
    isValid,
    close,
  };
};
