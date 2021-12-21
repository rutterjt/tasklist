import React from 'react';

// mui
import { Typography, Grid } from '@mui/material';

// components
import DateChip from '../DateChip';
import PriorityIcon from '../PriorityIcon';
import LabelDisplay from 'components/LabelDisplay';

const DescriptionDisplay = ({ description }) => {
  if (!description) return null;
  const shortDescription = description
    ? description.length > 100
      ? description.slice(0, 98) + '...'
      : description
    : '';
  return (
    <Typography gutterBottom variant="body2" sx={{ wordBreak: 'break-word' }}>
      {shortDescription}
    </Typography>
  );
};

const DueWrapper = ({ due }) => {
  if (!due) return null;
  return (
    <Grid item>
      <DateChip date={due} />
    </Grid>
  );
};

const PriorityWrapper = ({ priority }) => {
  if (!priority || priority >= 4) return null;
  return (
    <Grid item>
      <PriorityIcon priority={priority} />
    </Grid>
  );
};

const LabelWrapper = ({ label }) => {
  if (!label) return null;
  return (
    <Grid item>
      <LabelDisplay label={label} />
    </Grid>
  );
};

const TaskSecondaryInfo = ({ description, due, priority, label }) => {
  return (
    <>
      <DescriptionDisplay description={description} />
      {/* Only render bottom panel if there is either a due date or a set priority */}
      {(due || priority < 4 || label) && (
        <Grid container spacing={2}>
          <DueWrapper due={due} />
          <LabelWrapper label={label} />
          <PriorityWrapper priority={priority} />
        </Grid>
      )}
    </>
  );
};

export default TaskSecondaryInfo;
