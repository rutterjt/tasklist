import React, { useState, useEffect, useCallback } from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

// redux
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

// store
import { taskCompleted, selectTaskById } from '../tasksSlice';

// components
import TaskCheckbox from './TaskCheckbox';
import TaskPrimaryInfo from './TaskPrimaryInfo';
import TaskSecondaryInfo from './TaskSecondaryInfo';
import TaskPopup from '../TaskPopup';
import TaskUndoAlert from '../TaskUndoAlert';

// hooks
import { usePopup } from '../../../hooks/usePopup';

/**
 * Renders a task's data as a MUI ListItem.
 *
 * Renders components that display the task data, open a modal box to update the task data, and handle deleting the task.
 * @param {object} taskId - The task's id.
 * @param {function} handleDelete - Code to run when a task is deleted (e.g., opening a notification with an option to undo).
 */
const Task = ({ taskId, handleDelete }) => {
  const dispatch = useDispatch();

  // destructuring task properties
  const task = useSelector(
    (state) => selectTaskById(state, taskId),
    shallowEqual
  );
  console.log(taskId);

  const { name, completed } = task;

  // checkbox state: when true, the item is deleted
  const [checked, setChecked] = useState(completed);
  const [alertOpen, setAlertOpen] = useState(!completed);
  const [detailsOpen, openDetails, closeDetails] = usePopup(false);

  const deleteTask = useCallback(
    (id) => {
      dispatch(taskCompleted(id));
    },
    [dispatch]
  );

  const handleUndoDeleteTask = () => setChecked(false);

  // creates 500ms lag between clicking checkbox and deleting item.
  useEffect(() => {
    let deleteTimeout;
    if (checked) {
      deleteTimeout = setTimeout(() => deleteTask(taskId), 500);
    } else {
      clearTimeout(deleteTimeout);
    }
    return () => clearTimeout(deleteTimeout);
  }, [checked, deleteTask, taskId]);

  // useEffect(() => {
  //   let closeAlertTimeout;
  //   if (checked) {
  //     closeAlertTimeout;
  //   }
  // }, [checked]);

  // check handler
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  if (!name || !taskId) return null;

  if (completed)
    return (
      <TaskUndoAlert
        open={completed}
        id={taskId}
        handleClose={handleUndoDeleteTask}
      />
    );

  return (
    <>
      {completed ? (
        <TaskUndoAlert
          open={completed}
          id={taskId}
          handleClose={handleUndoDeleteTask}
        />
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemIcon>
              <TaskCheckbox
                checked={checked}
                handleCheck={handleCheck}
                taskName={name}
              />
            </ListItemIcon>
            <ListItemButton onClick={openDetails}>
              <ListItemText
                disableTypography
                primary={<TaskPrimaryInfo name={name} />}
                secondary={<TaskSecondaryInfo {...task} />}
              />
            </ListItemButton>
          </ListItem>
          <TaskPopup
            open={task && detailsOpen}
            onClose={closeDetails}
            id={taskId}
          />
          <Divider component="li" sx={{ ml: 7 }} />
        </>
      )}
    </>
  );
};

Task.propTypes = {
  taskId: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Task;
