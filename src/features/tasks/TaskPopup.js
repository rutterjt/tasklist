import React from 'react';

// redux
import { useSelector } from 'react-redux';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Button, Box, Typography, Grid } from '@mui/material';

// components
import {
  PriorityIcon,
  DateChip,
  WarningDialog,
  CustomDialog,
} from '../../components';
import TaskUpdateForm from './TaskUpdateForm';
import LabelDisplay from '../labels/LabelDisplay';

// store
import { selectTaskById } from './tasksSlice';

// hooks
import { usePopup } from '../../hooks/usePopup';

export const DetailsGrid = ({ children }) => (
  <Grid container justifyContent="space-between">
    {children}
  </Grid>
);

export const ButtonGrid = ({ children }) => (
  <Grid container sx={{ mt: 4 }} justifyContent="flex-end" spacing={2}>
    {children}
  </Grid>
);

const TaskPopupBox = ({
  name,
  description,
  due,
  priority,
  openEditor,
  label,
  onClose,
}) => (
  <Box sx={{ p: 3 }} data-testid="taskDetails">
    <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
      {name}
    </Typography>
    {description && (
      <Typography variant="body1" sx={{ mb: 4 }}>
        {description}
      </Typography>
    )}
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <DateChip date={due} />
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          {label && (
            <Grid item>
              <LabelDisplay label={label} />
            </Grid>
          )}
          <Grid item>
            <PriorityIcon priority={priority} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <ButtonGrid>
      <Grid item>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
          onClick={openEditor}
        >
          Update
        </Button>
      </Grid>
    </ButtonGrid>
  </Box>
);

/**
 * Renders a modal box to display the Task's details.
 * @param {boolean} open - Boolean for whether the dialog should be open.
 * @param {function} onClose - Code to run when the user attempts to close the dialog.
 * @param {string} id - The id of the current task.
 */
const TaskPopup = ({ open, onClose, id }) => {
  const task = useSelector((state) => selectTaskById(state, id));
  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor, tryCloseEditor] = usePopup(false);

  // closes the TaskPopup dialog
  const confirmClose = () => {
    closeWarning();
    closeEditor();
    onClose();
  };

  // attempts to close the ui
  const tryClose = () =>
    tryCloseEditor(() => !editorOpen, confirmClose, openWarning);

  return (
    <CustomDialog onClose={tryClose} open={open}>
      {editorOpen ? (
        <TaskUpdateForm
          task={task}
          handleClose={tryClose}
          handleSave={closeEditor}
        />
      ) : (
        <TaskPopupBox {...task} openEditor={openEditor} onClose={onClose} />
      )}
      <WarningDialog
        open={warningOpen}
        title="Discard changes"
        body="Are you sure you want to discard all your changes? This can't be undone."
        cancelLabel="Keep Editing"
        confirmLabel="Discard"
        handleCancel={closeWarning}
        handleConfirm={confirmClose}
      />
    </CustomDialog>
  );
};

TaskPopup.defaultProps = {
  open: false,
};

TaskPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TaskPopup;
