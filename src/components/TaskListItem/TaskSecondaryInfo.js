import React from 'react';

// mui
import { Typography, Grid } from '@mui/material';

// components
import DateChip from '../DateChip';
import PriorityIcon from '../PriorityIcon';

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

const DueDisplay = ({ due }) => {
  if (!due) return null;
  return (
    <Grid item>
      <DateChip date={due} />
    </Grid>
  );
};

const PriorityDisplay = ({ priority }) => {
  if (!priority || priority >= 4) return null;
  return (
    <Grid item>
      <PriorityIcon priority={priority} />
    </Grid>
  );
};

const TaskSecondaryInfo = ({ description, due, priority }) => {
  return (
    <>
      <DescriptionDisplay description={description} />
      {/* Only render bottom panel if there is either a due date or a set priority */}
      {(due || priority < 4) && (
        <Grid container spacing={1}>
          <DueDisplay due={due} />
          <PriorityDisplay priority={priority} />
        </Grid>
      )}
    </>
  );
};

export default TaskSecondaryInfo;
