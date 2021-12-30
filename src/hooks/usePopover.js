import { useState } from 'react';

/**
 * Manages state to open and close a popover box.
 *
 * Returns an array:
 *
 * anchor: the current anchor element for the popover
 *
 * handleOpen: accepts an event object, opens the popover and anchors it to the event target.
 *
 * handleClose: closes the popover.
 *
 * popoverOpen: boolean value for whether the popover is currently open
 *
 * @param {object}  [defaultValue=null] - Default value of the anchor.
 *
 */
export const usePopover = (defaultValue = null) => {
  const [anchor, setAnchor] = useState(defaultValue);

  /**
   * Opens the popover by setting the value of the anchor to the current click target.
   *
   * @param {object} e - An even object.
   */
  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return [anchor, handleOpen, handleClose, !!anchor];
};
