import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';

import { isInPast } from './time';

export const displayDate = (
  date,
  noDate = 'Schedule',
  pastDue = 'Past Due',
  formatPastDue = false
) => {
  // Takes a date in milliseconds unix time, and an optional fallback string. Returns a string containing a formatted version of the date.
  if (!date || typeof date !== 'number') return noDate;
  else if (isToday(date)) return 'Today';
  else if (isTomorrow(date)) return 'Tomorrow';
  else if (isInPast(date)) {
    return formatPastDue ? format(date, 'MM/dd/yyyy') : pastDue;
  }
  return format(date, 'MM/dd/yyyy');
};
