import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Grid } from '@mui/material';

// components
import {
  CustomForm,
  TextControl,
  DueDateControl,
  LabelControl,
  PriorityControl,
} from '../../components/forms';

// utils
import { updateFormData } from '../../utils/form';

/**
 * Manages UI related to creating new tasks.
 * @param {object} data - A formData state object.
 * @param {function} setter - The state setter for the formData.
 * @param {function} onSubmit - Callback to handle a submit event.
 * @param {function} closeForm - Callback to handle closing the form.
 * @param {boolean} [editing=false] - (Optional) boolean flag for whether the form is editing an existing task. If true, results in minor ui changes, but does not affect form functionality.
 * @return A form with fully controlled input components for all task data.
 */
const TaskForm = ({ data, setter, onSubmit, closeForm, editing }) => {
  if (!data) return null;
  // extract individual values
  const { name, description, priority, due, label } = data;

  // setters
  const updateData = updateFormData(setter);
  const setName = updateData('name');
  const setDescription = updateData('description');
  const setPriority = updateData('priority');
  const setDue = updateData('due');
  const setLabel = updateData('label');

  // creates controlled components
  const update = (setter) => (e) => setter(e.target.value);

  return (
    <CustomForm
      onSubmit={onSubmit}
      title={editing ? 'Update Task' : 'Create Task'}
      canSubmit={name ? true : false}
      onCancel={closeForm}
      submitButton={editing ? 'Update Task' : 'Add Task'}
    >
      <TextControl
        label="Task"
        value={name || ''}
        onChange={update(setName)}
        required
        autoFocus
      />
      <TextControl
        label="Description"
        value={description || ''}
        onChange={update(setDescription)}
        lines={3}
      />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <DueDateControl date={due} setDate={setDue} />
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <LabelControl labelId={label} setLabel={setLabel} />
            </Grid>
            <Grid item>
              <PriorityControl priority={priority} setPriority={setPriority} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomForm>
  );
};

TaskForm.defaultProps = {
  editing: false,
};

TaskForm.propTypes = {
  data: PropTypes.object.isRequired,
  setter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

export default TaskForm;
