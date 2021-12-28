import React from 'react';

// components
import CustomForm from './CustomForm';
import TextControl from './TextControl';
import ColorDropdownControl from './ColorDropdownControl';

// utils
import { updateFormData } from 'utils/form';

/**
 * Renders a form to create/update a label.
 * @param {object} props.data - A formData state object.
 * @param {function} props.setter - The state setter for the formData.
 * @param {function} props.onSubmit - Callback to handle a submit event.
 * @param {function} props.closeForm - Callback to handle closing the form.
 * @param {array} props.labels - An array of labels.
 * @param {boolean} [props.editing=false] - (Optional) boolean flag for whether the form is editing an existing task. If true, results in minor ui changes, but does not affect form functionality.
 * @return A form with fully controlled input components for all label data.
 */
const LabelForm = ({
  data,
  setter,
  onSubmit,
  closeForm,
  labels,
  editing = false,
}) => {
  // extract values from state
  const { name, color, id } = data;

  // setters
  const updateData = updateFormData(setter);
  const setName = updateData('name');
  const setColor = updateData('color');

  // creates controlled components
  const update = (setter) => (e) => setter(e.target.value);

  const named = (name) => (target) => target.name === name;
  const nameNotInLabels = (name) =>
    labels.filter(named(name)).filter((name) => name.id !== id).length === 0;
  const nameInLabels = (name) => !nameNotInLabels(name);

  const canSubmit = () => {
    return name && nameNotInLabels(name);
  };

  return (
    <CustomForm
      onSubmit={onSubmit}
      title={editing ? 'Update Label' : 'Create Label'}
      onCancel={closeForm}
      canSubmit={canSubmit()}
      submitButton={editing ? 'Update Label' : 'Add Label'}
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
      <ColorDropdownControl color={color} setColor={setColor} />
    </CustomForm>
  );
};

export default LabelForm;
