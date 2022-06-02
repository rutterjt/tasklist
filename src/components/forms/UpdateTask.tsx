import React from 'react';

import { TaskForm } from './TaskForm';

import { TaskIncompleteType, TaskType } from '../../types';
import { UPDATE_TASK } from '../../store/actions';
import { useStore } from '../../store/useStore';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  task: TaskType;
};

export const UpdateTask: React.FC<Props> = ({ task, onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: TaskIncompleteType) => {
    console.log(data);
    dispatch({
      type: UPDATE_TASK,
      payload: { id: task.id, data },
    });
    onClose();
  };

  return (
    <TaskForm
      title="Update Task"
      onSubmit={handleSubmit}
      onClose={onDiscard}
      defaultValues={task}
    />
  );
};
