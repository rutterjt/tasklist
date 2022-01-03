import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Grid } from '@mui/material';

// components
import CustomForm from './CustomForm';
import TextControl from './TextControl';
import DueDateControl from './DueDateControl';
import LabelControl from './LabelControl';
import PriorityControl from './PriorityControl';

// utils
import { updateFormData } from '../../utils/form';

/**
 * Renders a form to create/update a task.
 * @param {object} props.data - A formData state object.
 * @param {function} props.setter - The state setter for the formData.
 * @param {function} props.onSubmit - Callback to handle a submit event.
 * @param {function} props.closeForm - Callback to handle closing the form.
 * @param {boolean} [props.editing=false] - (Optional) boolean flag for whether the form is editing an existing task. If true, results in minor ui changes, but does not affect form functionality.
 * @return A form with fully controlled input components for all task data.
 */
const TaskForm = ({ data, setter, onSubmit, closeForm, editing = false }) => {
  if (!data) return null;
  // extract values from state
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
        name="Task"
        value={name || ''}
        onChange={update(setName)}
        required
        autoFocus
      />
      <TextControl
        name="Description"
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
              <LabelControl label={label} setLabel={setLabel} />
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
