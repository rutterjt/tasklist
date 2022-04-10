import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// components
import ShortChip from './ShortChip';

// date
import { displayDate } from '../utils/date';

type Props = {
  date: number;
  noLabel: string;
};

/**
 * Renders a MUI Chip component to display a date.
 *
 * Parse's the date value and formats it as 'Today', 'Tomorrow', or else the full date in 'mm/dd/yyyy' format.
 *
 * If no date is provided, it will display a custom text.
 */
export const DateChip: React.FC<Props> = ({
  date,
  noLabel = 'Unscheduled',
}) => {
  const label = displayDate(date, noLabel);
  const chipColor = displayDate(date, noLabel, 'Past Due');
  let color = '';
  switch (chipColor) {
    case 'Today':
      color = 'success';
      break;
    case 'Tomorrow':
      color = 'primary';
      break;
    case 'Past Due':
      color = 'error';
      break;
    default:
      return <ShortChip label={label} variant="outlined" />;
  }

  return <ShortChip color={color} label={label} variant="outlined" />;
};
