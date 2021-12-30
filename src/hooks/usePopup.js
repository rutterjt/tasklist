import { useState } from 'react';

export const usePopup = (defaultValue = false) => {
  const [popupOpen, setPopupOpen] = useState(defaultValue);

  const open = () => setPopupOpen(true);
  const close = () => setPopupOpen(false);

  /**
   * Accepts an object with one or more callback functions as properties. Closes the popup if tryCallback returns true.
   *
   * If tryCallback returns true, the popup will close, and the optional successCallback will run.
   *
   * If not, the popup will not close, and the optional failureCallback will run.
   *
   * @param {function} tryCallback - A callback that returns a boolean value. Determines whether the popup will close.
   * @param {function} [successCallback] - (Optional) callback, runs if tryCallback returns true.
   * @param {function} [failureCallback] - (Optional) callback, runs if tryCallback returns false.
   */
  const tryClose = (
    tryCallback,
    successCallback = undefined,
    failureCallback = undefined
  ) => {
    if (tryCallback()) {
      if (successCallback !== undefined) successCallback();
      close();
    } else {
      if (failureCallback !== undefined) failureCallback();
    }
  };

  return [popupOpen, open, close, tryClose];
};
