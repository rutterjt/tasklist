import React, { useState } from 'react';

// proptypes
import PropTypes from 'prop-types';

// components
import TaskForm from './TaskForm';

// store
import { useStore } from '../../store/useStore';
import { UPDATE_TASK } from '../../store/actions';

const TaskUpdateForm = ({ task, handleClose, handleSave }) => {
  const { dispatch } = useStore();
  const [formData, setFormData] = useState({ ...task });

  // store
  const updateCreator = (id, data) => ({
    type: UPDATE_TASK,
    payload: { id, data },
  });

  const updateTask = () => dispatch(updateCreator(task.id, formData));

  const saveData = () => {
    updateTask();
    handleSave();
  };

  return (
    <TaskForm
      data={formData}
      setter={setFormData}
      onSubmit={saveData}
      closeForm={handleClose}
      editing
    />
  );
};

TaskUpdateForm.propTypes = {
  task: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default TaskUpdateForm;
