import React from 'react';

// mui
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components

import { CustomDialog, WarningDialog } from '../../components';
import TaskForm from './TaskForm';

// hooks
import { useTaskCreate } from './useTaskCreate';
import { usePopup } from '../../hooks/usePopup';

/**
 * Handles all UI logic for rendering a task create form as a dialog box.
 *
 * Renders a button that, when pressed, causes a task create form to render as a modal dialog.
 *
 * Also renders a warning dialog when the user attempts to close the form without saving.
 */
const TaskCreateDialog = () => {
  const { data, setter, submit, isEmpty, isValid, close } = useTaskCreate();
  const [formOpen, openForm, closeForm, tryCloseForm] = usePopup();
  const [warningOpen, openWarning, closeWarning] = usePopup();

  // form error checking
  const confirmClose = () => {
    close();
    closeForm();
    closeWarning();
  };

  const tryClose = () => tryCloseForm(isEmpty, confirmClose, openWarning);

  // submit
  const handleSubmit = () => {
    if (isValid()) {
      submit();
      confirmClose();
    }
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="Create new task"
        focusRipple
        onClick={openForm}
      >
        <AddIcon />
      </IconButton>
      <CustomDialog open={formOpen} onClose={tryClose}>
        <TaskForm
          data={data}
          setter={setter}
          onSubmit={handleSubmit}
          closeForm={tryClose}
        />
      </CustomDialog>
      <WarningDialog
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone"
        handleCancel={closeWarning}
        handleConfirm={confirmClose}
        confirmLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </>
  );
};

export default TaskCreateDialog;
