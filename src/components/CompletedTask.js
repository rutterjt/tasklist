import React, { useState } from 'react';

// mui
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from '@mui/material';

// store
import { useStore } from '../store/context';
import { RESTORE_TASK } from '../store/actions';

// components
import TaskDeleteControl from './TaskListItem/TaskDeleteControl';
import TaskPrimaryInfo from './TaskListItem/./TaskPrimaryInfo';
import TaskSecondaryInfo from './TaskListItem/./TaskSecondaryInfo';

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

  if (!task) return null;

  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <TaskDeleteControl
          checked={checked}
          handleCheck={() => restoreTask(id)}
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
  );
};

export default CompletedTask;
