import React, { useState } from 'react';

// proptypes
import PropTypes from 'prop-types';

// components
import LabelForm from './LabelForm';

// store
import { useStore } from '../../store/useStore';
import { ADD_LABEL } from '../../store/actions';

/**
 * A component to create new labels. Manages updating and submitting form data, and renders a LabelForm to control the form UI.
 * @param {function} closeForm - Function to run when closing the form.
 */
const LabelCreateForm = ({ closeForm }) => {
  const { dispatch, labels } = useStore();
  const [formData, setFormData] = useState({});

  // store
  const addLabelCreator = (formData) => ({
    type: ADD_LABEL,
    payload: { label: { ...formData } },
  });

  const createLabel = () => dispatch(addLabelCreator(formData));

  const handleSubmit = () => {
    createLabel();
    setFormData({});
    closeForm();
  };

  return (
    <LabelForm
      data={formData}
      setter={setFormData}
      onSubmit={handleSubmit}
      closeForm={closeForm}
      labels={labels}
    />
  );
};

LabelCreateForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

export default LabelCreateForm;
