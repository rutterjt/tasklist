import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// components
import ShortChip from './ShortChip';

// date
import { displayDate } from '../utils/date';

/**
 * Renders a MUI Chip component to display a date.
 *
 * Parse's the date value and formats it as 'Today', 'Tomorrow', or else the full date in 'mm/dd/yyyy' format.
 *
 * If no date is provided, it will display a custom text.
 *
 * @param {number} [date] - A date as a number representing milliseconds Unix time.
 * @param {string} [noLabel='Unscheduled'] - (Optional) the text to display if no date is provided. Defaults to 'Unscheduled'
 */
const DateChip = ({ date, noLabel = 'Unscheduled' }) => {
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

DateChip.defaultProps = {
  noLabel: 'Unscheduled',
};

DateChip.propTypes = {
  date: PropTypes.number,
  noLabel: PropTypes.string,
};

export default DateChip;
