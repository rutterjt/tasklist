import React, { useState } from 'react';

// proptypes
import PropTypes from 'prop-types';

// redux
import { useDispatch } from 'react-redux';

// components
import TaskForm from './TaskForm';

// store
import { taskUpdated } from '../../store/slices/listSlice';

/**
 * A component to update an already-existing task. Manages updating and submitting form data, and renders a TaskForm to control the form UI.
 * @param {object} task - The task object to update.
 * @param {function} handleClose - Function to run when closing the form.
 * @param {function} handleSave - Function to run to run when submitting the form data.
 */
const TaskUpdateForm = ({ task, handleClose, handleSave }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...task });

  const updateTask = (id, data) => dispatch(taskUpdated({ id, data }));

  const saveData = () => {
    updateTask(task.id, formData);
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
