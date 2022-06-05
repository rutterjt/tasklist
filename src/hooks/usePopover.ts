import React, { useState } from 'react';

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
 */
export const usePopover = (defaultValue = null as Element | null) => {
  const [anchor, setAnchor] = useState(defaultValue);

  /**
   * Opens the popover by setting the value of the anchor to the current click target.
   */
  const handleOpen = (e: React.SyntheticEvent) => {
    if (e.currentTarget) {
      setAnchor(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return [anchor, handleOpen, handleClose, !!anchor] as [
    typeof anchor,
    typeof handleOpen,
    typeof handleClose,
    boolean
  ];
};
