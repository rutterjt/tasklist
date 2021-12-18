import React from 'react';

// components
import ShortChip from './ShortChip';

// date
import { displayDate } from '../utils/date';

// accepts a date value in milliseconds, unix time
const DateChip = ({ date, noLabel = 'Unscheduled' }) => {
  const label = displayDate(date, noLabel, 'Past Due', true);
  const chipColor = displayDate(date, noLabel);
  let color = '';
  switch (chipColor) {
    case 'Today':
      color = 'success';
      break;
    case 'Tomorrow':
      color = 'warning';
      break;
    case 'Past Due':
      color = 'error';
      break;
    default:
      return <ShortChip label={label} variant="outlined" />;
  }

  return <ShortChip color={color} label={label} variant="outlined" />;
};

export default DateChip;