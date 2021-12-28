import React, { useState } from 'react';

// mui
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// store
import { useStore } from 'store/useStore';
import { ADD_TASK } from 'store/actions';

// components
import WarningDialog from 'components/WarningDialog';
import TaskForm from './TaskForm';

// helpers
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// Add task button: controls whether the form is visible
const AddButton = ({ openForm }) => (
  <Button variant="text" onClick={openForm} startIcon={<AddIcon />}>
    Add task
  </Button>
);

// main component control: maintains form state, handles dispatch to store
const TaskCreateForm = ({ defaultItem }) => {
  const { dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [formData, setFormData] = useState(
    defaultItem ? { ...defaultItem } : {}
  );

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_TASK,
      payload: { ...data },
    };
  };

  const newItem = () => dispatch(itemCreator(formData));

  // clears the entire form
  const clearForm = () => setFormData({ ...defaultItem });

  // closes the form, closes the warning dialog, clears out all form data
  const confirmCloseForm = () => {
    setWarningOpen(false);
    setFormOpen(false);
    clearForm();
  };

  // attempts to close the form and discard changes
  // if form data is not empty: opens a warning dialog
  // if form data is empty: discards changes and closes form
  const closeForm = () => {
    if (isEmpty(formData) || isEqual(formData, defaultItem)) confirmCloseForm();
    else setWarningOpen(true);
  };

  const handleSubmit = () => {
    newItem();
    confirmCloseForm();
  };

  return (
    <Box sx={{ mt: 2 }}>
      {formOpen ? (
        <TaskForm
          data={formData}
          setter={setFormData}
          closeForm={closeForm}
          onSubmit={handleSubmit}
        />
      ) : (
        <AddButton openForm={() => setFormOpen(true)} />
      )}
      <WarningDialog
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone."
        handleCancel={() => setWarningOpen(false)}
        handleConfirm={confirmCloseForm}
        confirmLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </Box>
  );
};

export default TaskCreateForm;
