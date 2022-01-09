import React from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// proptypes
import PropTypes from 'prop-types';

// components
import CustomForm from './CustomForm';
import TextControl from './TextControl';
import ColorDropdownControl from './ColorDropdownControl';

// utils
import { updateFormData } from '../../utils/form';

// store
import { selectLabelsAsList } from '../../store/slices/labelsSlice';

/**
 * Renders a form to create/update a label.
 * @param {object} data - A formData state object.
 * @param {function} setter - The state setter for the formData.
 * @param {function} onSubmit - Callback to handle a submit event.
 * @param {function} closeForm - Callback to handle closing the form.
 * @param {boolean} [editing=false] - (Optional) boolean flag for whether the form is editing an existing task. If true, results in minor ui changes, but does not affect form functionality.
 * @return A form with fully controlled input components for all label data.
 */
const LabelForm = ({ data, setter, onSubmit, closeForm, editing }) => {
  // extract values from state
  const { name, color, id } = data;
  const labels = useSelector(selectLabelsAsList, shallowEqual);

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
    return name && nameNotInLabels(name) ? true : false;
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
        label="Name"
        value={name || ''}
        onChange={update(setName)}
        required
        autoFocus
        error={nameInLabels(name)}
        helperText={nameInLabels(name) ? 'Label already exists.' : ''}
      />
      <ColorDropdownControl color={color || ''} setColor={setColor} />
    </CustomForm>
  );
};

LabelForm.defaultProps = {
  editing: false,
};

LabelForm.propTypes = {
  data: PropTypes.object.isRequired,
  setter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  labels: PropTypes.array.isRequired,
  editing: PropTypes.bool,
};

export default LabelForm;
