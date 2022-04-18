import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../app/hooks';

import { useForm } from 'react-hook-form';

// components
import {
  CustomForm,
  TextControl,
  ColorDropdownControl,
} from '../../components/forms';

// utils
import { updateFormData } from '../../utils/form';

// store
import {
  selectLabelById,
  selectLabelsAsArray,
  IncompleteLabel,
} from './labelsSlice';

type Inputs = {
  name: string;
  color: string;
};

type Props = {
  onSubmit: () => void;
  defaultValues?: IncompleteLabel;
};

const defaults = {
  name: '',
  color: '',
};

/**
 * Renders a form to create/update a label.

* @return A form with fully controlled input components for all label data.
 */
export const LabelForm: React.FC<Props> = ({
  onSubmit,
  defaultValues = defaults,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues });

  return <form onSubmit={() => handleSubmit(onSubmit)}>Hello</form>;

  // extract values from state
  // const { name, color, id } = data;
  // const labels = useSelector(selectLabelsAsArray, shallowEqual);
  // const [errorMessage, setErrorMessage] = useState('');

  // setters
  // const updateData = updateFormData(setter);
  // const setName = updateData('name');
  // const setColor = updateData('color');

  // creates controlled components
  // const update = (setter) => (e) => setter(e.target.value);

  // const named = (name) => (target) => target.name === name;
  // const nameNotInLabels = (name) =>
  //   labels.filter(named(name)).filter((name) => name.id !== id).length === 0;

  // const canSubmit = () => {
  //   return name && nameNotInLabels(name);
  // };

  // const handleSubmit = () => {
  //   if (canSubmit()) {
  //     setErrorMessage('');
  //     onSubmit();
  //   } else {
  //     setErrorMessage('A label with this name already exists.');
  //   }
  // };

  // return (
  //   <CustomForm
  //     onSubmit={handleSubmit}
  //     title={editing ? 'Update Label' : 'Create Label'}
  //     onCancel={closeForm}
  //     canSubmit={!!name}
  //     submitButton={editing ? 'Update Label' : 'Add Label'}
  //   >
  //     <TextControl
  //       label="Name"
  //       value={name || ''}
  //       onChange={update(setName)}
  //       required
  //       autoFocus
  //       error={errorMessage}
  //       helperText={errorMessage}
  //     />
  //     <ColorDropdownControl color={color || ''} setColor={setColor} />
  //   </CustomForm>
  // );
};
