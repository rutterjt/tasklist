import React from 'react';

// mui
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

// components
import Layout from '../components/Layout';
import CompletedTaskList from '../components/CompletedTaskList';

// store
import { useStore } from '../store/useStore';
import { EMPTY_TRASH } from '../store/actions';

const Completed = () => {
  const { dispatch, deleted } = useStore();
  const deleteCreator = () => ({ type: EMPTY_TRASH });
  const deleteAll = () => dispatch(deleteCreator());

  return (
    <Layout>
      <CompletedTaskList list={deleted} noCheckbox />
      <Button
        onClick={deleteAll}
        color="error"
        startIcon={<Delete />}
        sx={{ mt: '0.5rem' }}
      >
        Delete All
      </Button>
    </Layout>
  );
};

export default Completed;
