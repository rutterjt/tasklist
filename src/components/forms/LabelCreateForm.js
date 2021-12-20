import React, { useState } from 'react';

// components
import TextControl from './TextControl';
import CustomForm from './CustomForm';

// store
import { useStore } from 'store/useStore';
import { ADD_LABEL } from 'store/actions';

// renders the task creation form's ui
const Form = ({ formData, onSubmit, updateData, closeForm, labels }) => {
  // extract values from state
  const { name } = formData;

  // create setters
  const setName = updateData('name');

  const update = (setter) => (e) => setter(e.target.value);

  const named = (name) => (target) => target.name === name;
  const nameNotInLabels = (name) => labels.filter(named(name)).length === 0;
  const nameInLabels = (name) => !nameNotInLabels(name);

  const canSubmit = () => {
    return name && nameNotInLabels(name);
  };

  return (
    <CustomForm
      onSubmit={onSubmit}
      title="Create Label"
      onCancel={closeForm}
      canSubmit={canSubmit()}
      submitButton="Submit"
    >
      <TextControl
        name="Name"
        value={name || ''}
        onChange={update(setName)}
        required
        autoFocus
        error={nameInLabels(name)}
        helperText={nameInLabels(name) ? 'Label already exists.' : ''}
      />
    </CustomForm>
  );
};

const LabelCreateForm = ({ closeForm }) => {
  const { dispatch, labels } = useStore();
  const [formData, setFormData] = useState(false);

  // store
  const addLabelCreator = (formData) => ({
    type: ADD_LABEL,
    payload: { ...formData },
  });

  const createLabel = () => dispatch(addLabelCreator(formData));

  const handleSubmit = () => {
    createLabel();
    closeForm();
  };

  // form
  // accepts a string representing a task property,
  // returns a function that accepts a value, which updates the state as: state[property] = value;
  const updateData = (property) => (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [property]: value,
      };
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      formData={formData}
      labels={labels}
      updateData={updateData}
      closeForm={closeForm}
    />
  );
};

export default LabelCreateForm;
