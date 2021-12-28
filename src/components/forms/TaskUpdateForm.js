import React, { useState } from 'react';

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

export default TaskUpdateForm;
