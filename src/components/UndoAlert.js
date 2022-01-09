import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Snackbar, Alert, Button, Slide } from '@mui/material';

// redux
import { useDispatch } from 'react-redux';

// store
import { taskRestored } from '../store/slices/listSlice';

const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};

/**
 * Renders an alert confirming that a list item was deleted, with a button to undo the deletion.
 * @param {boolean} open - Whether the alert should render.
 * @param {function} handleClose - Code to run when the user attempts to close the alert, or the alert times out.
 * @param {string} id - The id of the most recently-deleted task.
 */
const UndoAlert = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const restoreTask = () => {
    dispatch(taskRestored(id));
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
