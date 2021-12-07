import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';

export const displayDate = (date, noDate = 'Schedule') => {
  return date
    ? isToday(date)
      ? 'Today'
      : isTomorrow(date)
      ? 'Tomorrow'
      : format(date, 'MM/dd/yyyy')
    : noDate;
};
