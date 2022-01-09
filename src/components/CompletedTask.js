import React, { useState } from 'react';

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
import { useDispatch } from 'react-redux';

// store
import { taskRestored } from '../store/slices/listSlice';

// components
import TaskDeleteControl from './TaskListItem/TaskDeleteControl';
import TaskPrimaryInfo from './TaskListItem/./TaskPrimaryInfo';
import TaskSecondaryInfo from './TaskListItem/./TaskSecondaryInfo';

/**
 * A modified TaskListItem, rendered by the CompletedTaskList to represent a task that has been deleted.
 * @param {object} task - A task object.
 */
const CompletedTask = ({ task }) => {
  // store
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);

  // destructuring task properties
  const { name, description, priority, due, id } = task;

  const restoreTask = (id) => {
    setChecked(false);
    dispatch(taskRestored(id));
  };

  if (!name || !id) return null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <TaskDeleteControl
            checked={checked}
            handleCheck={() => restoreTask(id)}
            taskName={task.name}
            action={'Restore'}
          />
        </ListItemIcon>
        <ListItemButton>
          <ListItemText
            disableTypography
            primary={<TaskPrimaryInfo name={name} />}
            secondary={
              <TaskSecondaryInfo
                description={description}
                due={due}
                priority={priority}
              />
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" sx={{ ml: 7 }} />
    </>
  );
};

CompletedTask.defaultProps = {
  task: {
    name: '',
    id: '',
  },
};

CompletedTask.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default CompletedTask;
