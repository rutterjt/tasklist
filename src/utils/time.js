import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isBefore from 'date-fns/isBefore';
import startOfToday from 'date-fns/startOfToday';

export const dueDate = (callback) => (task) =>
  task.due ? callback(task.due) : null;

export const isInPast = (date) => isBefore(date, startOfToday());
export const isInFuture = (date) => !isInPast(date);

export const isDueToday = (task) => dueDate(isToday)(task);
export const isDueTomorrow = (task) => dueDate(isTomorrow)(task);
export const isDueInFuture = (task) => dueDate(isInFuture)(task);
export const isPastDue = (task) => dueDate(isInPast)(task);
