import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Typography, Grid } from '@mui/material';

// components
import DateChip from '../DateChip';
import PriorityIcon from '../PriorityIcon';
import LabelDisplay from '../LabelDisplay';

const DescriptionDisplay = ({ description }) => {
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

/**
 * Renders the task's main details, appearing under the task's name.
 * @param {string} [description] - (Optional) the task's description.
 * @param {number} [due] - (Optional) the task's due date.
 * @param {number} [priority] - (Optional) the task's priority.
 * @param {object} [label] - (Optional) the task's description.
 */
const TaskSecondaryInfo = ({ description, due, priority, label }) => {
  return (
    <>
      <DescriptionDisplay description={description} />
      {/* Only render bottom panel if there is either a due date or a set priority */}
      {(due || priority < 4 || label) && (
        <Grid container spacing={2} alignItems="center">
          <DueWrapper due={due} />
          <LabelWrapper label={label} />
          <PriorityWrapper priority={priority} />
        </Grid>
      )}
    </>
  );
};

TaskSecondaryInfo.propTypes = {
  description: PropTypes.string,
  due: PropTypes.number,
  priority: PropTypes.number,
  label: PropTypes.object,
};

export default TaskSecondaryInfo;
