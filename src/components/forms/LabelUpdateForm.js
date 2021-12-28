import React, { useState } from 'react';

// components
import LabelForm from './LabelForm';

// store
import { useStore } from '../../store/useStore';
import { UPDATE_LABEL } from '../../store/actions';

const LabelUpdateForm = ({ label, closeForm }) => {
  const { dispatch, labels } = useStore();
  const [formData, setFormData] = useState({ ...label });

  // store
  const updateLabelCreator = (formData) => ({
    type: UPDATE_LABEL,
    payload: { old: { ...label }, update: { ...formData } },
  });

  const updateLabel = (data) => dispatch(updateLabelCreator(data));

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
      labels={labels}
      editing
    />
  );
};

export default LabelUpdateForm;