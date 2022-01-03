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

// components
import TaskDeleteControl from './TaskDeleteControl';
import TaskPrimaryInfo from './TaskPrimaryInfo';
import TaskSecondaryInfo from './TaskSecondaryInfo';
import TaskDetails from '../TaskDetails';

// store
import { useStore } from '../../store/useStore';
import { DELETE_TASK } from '../../store/actions';

// hooks
import { usePopup } from '../../hooks/usePopup';

/**
 * Renders a task's data as a MUI ListItem.
 *
 * Renders components that display the task data, open a modal box to update the task data, and handle deleting the task.
 * @param {object} task - The task object.
 * @param {function} handleDelete - Code to run when a task is deleted (e.g., opening a notification with an option to undo).
 */
const TaskListItem = ({ handleDelete, task }) => {
  const { dispatch } = useStore();
  // checkbox state: when true, the item is deleted
  const [checked, setChecked] = useState(false);
  const [detailsOpen, openDetails, closeDetails] = usePopup(false);

  // destructuring task properties
  const { name, id } = task;

  // deleting items
  const deleteCreator = (id) => {
    return { type: DELETE_TASK, payload: id };
  };

  const deleteTask = useCallback(
    (id) => {
      handleDelete(id);
      dispatch(deleteCreator(id));
    },
    [dispatch, handleDelete]
  );

  // creates 500ms lag between clicking checkbox and deleting item.
  useEffect(() => {
    let deleteTimeout;
    if (checked) {
      deleteTimeout = setTimeout(() => deleteTask(id), 500);
    } else {
      clearTimeout(deleteTimeout);
    }
    return () => clearTimeout(deleteTimeout);
  }, [checked, deleteTask, id]);

  // check handler
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  if (!name || !id) return null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <TaskDeleteControl
            checked={checked}
            handleCheck={handleCheck}
            taskName={task.name}
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
      <TaskDetails
        open={task && detailsOpen}
        onClose={closeDetails}
        {...task}
      />
      <Divider component="li" sx={{ ml: 7 }} />
    </>
  );
};

TaskListItem.defaultProps = {
  task: {
    name: '',
    id: '',
  },
};

TaskListItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TaskListItem;
