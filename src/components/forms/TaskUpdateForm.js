import React, { useState } from 'react';

// mui
import { Grid } from '@mui/material';

// components
import TextControl from './TextControl';
import { DetailsGrid } from 'components/TaskDetails';
import PriorityControl from './PriorityControl';
import DueDateControl from './DueDateControl';
import CustomForm from './CustomForm';
import LabelControl from './LabelControl';

// store
import { useStore } from 'store/useStore';
import { UPDATE_TASK } from 'store/actions';

const TaskUpdateForm = ({ task, handleClose, handleSave }) => {
  const { dispatch } = useStore();
  const [data, setData] = useState({ ...task });
  const { name, description, due, priority, id, label } = data;

  // updates a given value in the state object
  // accepts a string representing the object key
  // returns a new function that accepts a value prop and updates the state with the key/value pair
  const set = (key) => (value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  // individual setters
  const setName = set('name');
  const setDescription = set('description');
  const setDue = set('due');
  const setPriority = set('priority');
  const setLabel = set('label');

  const update = (setter) => (e) => setter(e.target.value);

  // store
  const updateCreator = (id, data) => ({
    type: UPDATE_TASK,
    payload: { id, data },
  });

  const updateTask = () => dispatch(updateCreator(id, data));

  const saveData = () => {
    updateTask();
    handleSave();
  };

  return (
    <CustomForm
      onSubmit={saveData}
      title={`Editing: ${name}`}
      onCancel={handleClose}
      canSubmit={name}
      cancelButton="Discard"
      submitButton="Save"
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
      <DetailsGrid>
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
      </DetailsGrid>
    </CustomForm>
  );
};

export default TaskUpdateForm;
