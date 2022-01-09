import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// mui
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

// redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// components
import Layout from '../components/Layout';
import CompletedTaskList from '../components/CompletedTaskList';
import WarningDialog from '../components/WarningDialog';

// store
import { completedDeleted, selectTaskIds } from '../store/slices/listSlice';

// custom hooks
import { usePopup } from '../hooks/usePopup';

const Completed = () => {
  const dispatch = useDispatch();
  const listIds = useSelector(selectTaskIds, shallowEqual);
  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  const deleteAll = () => {
    dispatch(completedDeleted());
    closeWarning();
  };

  const checkBeforeWarning = () => {
    if (!listIds.length) return;
    else openWarning();
  };

  return (
    <Layout>
      <Helmet>
        <title>Completed | TaskList</title>
      </Helmet>

      <CompletedTaskList listIds={listIds} noCheckbox />
      <Button
        onClick={checkBeforeWarning}
        color="error"
        startIcon={<Delete />}
        sx={{ mt: 1 }}
      >
        Delete All
      </Button>
      <WarningDialog
        open={warningOpen}
        title="Empty Trash"
        body="Are you sure you want to delete all of your completed tasks? This can't be undone."
        handleCancel={closeWarning}
        handleConfirm={deleteAll}
        cancelLabel="Cancel"
        confirmLabel="Delete"
      />
    </Layout>
  );
};

export default Completed;
