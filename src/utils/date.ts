import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';

import { isInPast } from './time';

/**
 * Returns a formatted date string.
 */
export const displayDate = (
  date: Date,
  noDate: string = 'Schedule',
  pastDue: string = ''
): string => {
  if (!date) return noDate;
  if (isToday(date)) return 'Today';
  else if (isTomorrow(date)) return 'Tomorrow';
  else if (isInPast(date)) {
    return pastDue ? pastDue : format(date, 'MM/dd/yyyy');
  }
  return format(date, 'MM/dd/yyyy');
};
