import React, { useState } from 'react';

// mui
import { Box, Grid, Paper, Typography, Button, TextField } from '@mui/material';

// components
import { PriorityField } from './PriorityField';
import { TaskIncompleteType, LabelType, PriorityType } from '../../types';
import { LabelField } from './LabelField';
import { DateField } from './DateField';

type FormDataType = {
  name?: string;
  description?: string;
};

type DefaultValues = {
  name?: string;
  description?: string;
  priority?: PriorityType;
  due?: Date;
  label?: LabelType;
  date?: Date;
  id?: string;
};

type Props = {
  onSubmit: (data: TaskIncompleteType) => void;
  onClose: () => void;
  defaultValues?: DefaultValues;
  title?: string;
};

/**
 * Renders a form to create/update a task.
 */
export const TaskForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  defaultValues,
  title = 'Create Task',
}) => {
  const [name, setName] = useState<string>(defaultValues?.name || '');
  const [description, setDescription] = useState<string | undefined>(
    defaultValues?.description || undefined
  );
  const [label, setLabel] = useState<LabelType | undefined>(
    defaultValues?.label || undefined
  );
  const [priority, setPriority] = useState<PriorityType>(
    defaultValues?.priority || 4
  );
  const [due, setDue] = useState<Date | undefined>(
    defaultValues?.due || undefined
  );

  const processSubmit = (data: FormDataType) => {
    const submissionData: TaskIncompleteType = {
      name: data.name || '',
      description: data.description || '',
      label,
      priority,
      due,
    };
    onSubmit(submissionData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let data = { name, description };
    processSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ p: 2 }}>
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <TextField
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="name"
          label="Task"
          required
          autoFocus
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
          maxRows={3}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <DateField date={due} setDate={setDue} />
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <LabelField label={label} setLabel={setLabel} />
              </Grid>
              <Grid item>
                <PriorityField priority={priority} setPriority={setPriority} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              disabled={!name}
              type="submit"
              color="success"
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
