import React from 'react';

// mui
import { Typography, Grid } from '@mui/material';

// components
import DateChip from '../DateChip';
import PriorityIcon from '../PriorityIcon';
import LabelDisplay from '../LabelDisplay';

// types
import { PriorityType, LabelType } from '../../types';

const DescriptionDisplay: React.FC<{ description: string }> = ({
  description,
}) => {
  if (!description) return null;
  const shortDescription = description
    ? description.length > 100
      ? description.slice(0, 98) + '...'
      : description
    : '';
  return (
    <Typography variant="body2" sx={{ wordBreak: 'break-word', mb: 1 }}>
      {shortDescription}
    </Typography>
  );
};

const DueWrapper: React.FC<{ due: Date }> = ({ due }) =>
  due ? (
    <Grid item>
      <DateChip date={due} />
    </Grid>
  ) : null;

const PriorityWrapper: React.FC<{ priority: PriorityType }> = ({
  priority,
}) => {
  if (!priority || priority >= 4) return null;
  return (
    <Grid item>
      <PriorityIcon priority={priority} />
    </Grid>
  );
};

const LabelWrapper: React.FC<{ label: LabelType }> = ({ label }) =>
  label ? (
    <Grid item>
      <LabelDisplay label={label} />
    </Grid>
  ) : null;

type Props = {
  description: string;
  due?: Date;
  priority: PriorityType;
  label?: LabelType;
};

/**
 * Renders the task's main details, appearing under the task's name.
 */
export const TaskSecondaryInfo: React.FC<Props> = ({
  description,
  due,
  priority,
  label,
}) => (
  <>
    <DescriptionDisplay description={description} />
    <Grid container spacing={2} alignItems="center">
      {due && <DueWrapper due={due} />}
      {label && <LabelWrapper label={label} />}
      <PriorityWrapper priority={priority} />
    </Grid>
  </>
);

export default TaskSecondaryInfo;
