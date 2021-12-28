import React, { useState } from 'react';

// components
import LabelForm from './LabelForm';

// store
import { useStore } from '../../store/useStore';
import { ADD_LABEL } from '../../store/actions';

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

export default LabelCreateForm;
