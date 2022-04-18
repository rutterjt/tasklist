import { useState } from 'react';

/**
 * Manages state to open and close a modal popup.
 *
 * Returns an array:
 *
 * popupOpen: boolean value, whether popup is currently open
 *
 * open: function to close the popup. Called without arguments.
 *
 * close: function to close the popup. Called without arguments.
 *
 * tryClose: function to attempt to close the popup. Accepts three callbacks. If first callback returns true, the popup will be closed, and the second callback will run. If not, the popup will not close, and the third callback will run.
 *
 * @param {boolean} [defaultValue=false] - Default value of whether the modal popup should be open.
 */
export const usePopup = (defaultValue: boolean = false) => {
  const [popupOpen, setPopupOpen] = useState<boolean>(defaultValue);

  const open = () => setPopupOpen(true);
  const close = () => setPopupOpen(false);

  /**
   * Accepts an object with one or more callback functions as properties. Closes the popup if tryCallback returns true.
   *
   * If tryCallback returns true, the popup will close, and the optional successCallback will run.
   *
   * If not, the popup will not close, and the optional failureCallback will run.
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
