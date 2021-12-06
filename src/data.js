import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpcomingIcon from '@mui/icons-material/Upcoming';

import {
  isDueToday,
  isDueTomorrow,
  isDueInFuture,
  isPastDue,
} from './utils/time';

export const navItems = [
  {
    title: 'All Tasks',
    to: '/',
    listCallback: () => true,
    icon: <InboxIcon fontSize="small" />,
  },
  {
    title: 'Today',
    to: '/today',
    listCallback: isDueToday,
    icon: <TodayIcon fontSize="small" />,
  },
  {
    title: 'Tomorrow',
    to: '/tomorrow',
    listCallback: isDueTomorrow,
    icon: <UpcomingIcon fontSize="small" />,
  },
  {
    title: 'Upcoming',
    to: '/upcoming',
    listCallback: isDueInFuture,
    icon: <EventNoteIcon fontSize="small" />,
  },
  {
    title: 'Past Due',
    to: '/due',
    listCallback: isPastDue,
    icon: <ScheduleIcon fontSize="small" />,
  },
];
