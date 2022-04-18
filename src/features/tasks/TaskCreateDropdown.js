import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components
import { WarningDialog } from '../../components';
import TaskForm from './TaskForm';

// hooks
import { useTaskCreate } from './useTaskCreate';
import { usePopup } from '../../hooks/usePopup';

/**
 * Renders a button that, when pressed, causes a Task creation form to be rendered as a dropdown.
 *
 * Also renders a warning dialog when the user attempts to close the form without saving.
 * @param {object} [defaultItem] - Default item data. Passed to the underlying Task form.
 */
const TaskCreateDropdown = ({ defaultItem }) => {
  const { data, setter, submit, close, isValid, isEmpty } = useTaskCreate();
  const [formOpen, openForm, closeForm, tryCloseForm] = usePopup(false);
  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  // closes the entire ui
  const confirmClose = () => {
    closeForm();
    closeWarning();
    close();
  };

  // submits the form
  const handleSubmit = () => {
    if (isValid()) {
      submit();
      confirmClose();
    }
  };

  // attempts to close the ui, running
  const tryClose = () => tryCloseForm(isEmpty, confirmClose, openWarning);

  return (
    <Box sx={{ mt: 2 }}>
      {formOpen ? (
        <TaskForm
          data={data}
          setter={setter}
          onSubmit={handleSubmit}
          closeForm={tryClose}
        />
      ) : (
        <Button variant="text" onClick={openForm} startIcon={<AddIcon />}>
          New task
        </Button>
      )}
      <WarningDialog
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone"
        handleCancel={closeWarning}
        handleConfirm={confirmClose}
        confirmLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </Box>
  );
};

TaskCreateDropdown.defaultProps = {
  defaultItem: {},
};

TaskCreateDropdown.propTypes = {
  defaultItem: PropTypes.object,
};

export default TaskCreateDropdown;
