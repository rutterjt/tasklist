import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// components
import LabelForm from './LabelForm';

// store
import { labelUpdated, selectLabelById } from './labelsSlice';

/**
 * A component to update an already-existing label. Manages updating and submitting form data, and renders a LabelForm to control the form UI.
 * @param {string} labelId - The id of the label to edit.
 * @param {function} closeForm - Function to run when closing the form.
 */
const LabelUpdateForm = ({ labelId, closeForm }) => {
  const label = useSelector((state) => selectLabelById(state, labelId));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...label });

  const updateLabel = (data) => dispatch(labelUpdated(data));

  const handleSubmit = () => {
    updateLabel(formData);
    setFormData({});
    closeForm();
  };

  return (
    <LabelForm
      data={formData}
      setter={setFormData}
      onSubmit={handleSubmit}
      closeForm={closeForm}
      editing
    />
  );
};

LabelUpdateForm.propTypes = {
  labelId: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default LabelUpdateForm;
