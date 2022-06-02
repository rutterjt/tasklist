import React from 'react';

import { TaskForm } from './TaskForm';

import { TaskIncompleteType } from '../../types';
import { ADD_TASK } from '../../store/actions';
import { useStore } from '../../store/useStore';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
};

export const CreateTask: React.FC<Props> = ({ onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: TaskIncompleteType) => {
    dispatch({
      type: ADD_TASK,
      payload: { ...data },
    });
    onClose();
  };

  return <TaskForm onSubmit={handleSubmit} onClose={onDiscard} />;
};
