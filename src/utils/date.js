import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';

import { isInPast } from './time';

/**
 * Returns a formatted date string.
 * @param {number} [date] - A date in miliseconds unix time.
 * @param {string} [noDate='Schedule'] - (Optional) the return value if date is not provided or incorrect.
 * @param {string} [pastDue=''] - (Optional) an optional return value for a date that is earlier than today. If not provided, the date will be parsed as normal.
 * @return {string} A formatted date string.
 */
export const displayDate = (date, noDate = 'Schedule', pastDue = '') => {
  if (!date || typeof date !== 'number') return noDate;
  else if (isToday(date)) return 'Today';
  else if (isTomorrow(date)) return 'Tomorrow';
  else if (isInPast(date)) {
    return pastDue ? pastDue : format(date, 'MM/dd/yyyy');
  }
  return format(date, 'MM/dd/yyyy');
};
