import React, { useState } from 'react';

// proptypes
import PropTypes from 'prop-types';

// redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// components
import LabelForm from './LabelForm';

// store
import {
  labelCreated,
  selectLabelsAsList,
} from '../../store/slices/labelsSlice';

/**
 * A component to create new labels. Manages updating and submitting form data, and renders a LabelForm to control the form UI.
 * @param {function} closeForm - Function to run when closing the form.
 */
const LabelCreateForm = ({ closeForm }) => {
  const labels = useSelector(selectLabelsAsList, shallowEqual);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const createLabel = () => dispatch(labelCreated(formData));

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
