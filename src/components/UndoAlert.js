import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Snackbar, Alert, Button, Slide } from '@mui/material';

// store
import { useStore } from '../store/useStore';
import { RESTORE_TASK } from '../store/actions';

const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};

const UndoAlert = ({ open, handleClose, id }) => {
  const { dispatch } = useStore();

  // store
  const restoreCreator = (id) => ({
    type: RESTORE_TASK,
    payload: id,
  });

  const restoreTask = () => {
    dispatch(restoreCreator(id));
    handleClose();
  };

  if (!id) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      sx={{ width: '100%', maxWidth: '280px' }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        severity="success"
        elevation={6}
        variant="filled"
        sx={{ width: '100%' }}
        action={
          <Button color="inherit" size="small" onClick={restoreTask}>
            Undo
          </Button>
        }
      >
        Task completed!
      </Alert>
    </Snackbar>
  );
};

UndoAlert.defaultProps = {
  open: false,
};

UndoAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default UndoAlert;
