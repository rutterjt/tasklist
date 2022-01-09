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

// store
import { useStore } from '../store/useStore';
import { RESTORE_TASK } from '../store/actions';

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
  const { dispatch } = useStore();
  const [checked, setChecked] = useState(true);

  // destructuring task properties
  const { name, description, priority, due, id } = task;

  const restoreCreator = (id) => {
    return { type: RESTORE_TASK, payload: id };
  };

  const restoreTask = (id) => {
    setChecked(false);
    dispatch(restoreCreator(id));
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
