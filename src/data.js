import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';

export const defaultList = [
  {
    name: 'Item 1',
    description:
      'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. ',
    due: '',
    label: '',
    id: '2c95e644-2e7a-4481-b972-d4401d5827dd',
  },
  {
    name: 'Item 2',
    description: '',
    due: '',
    label: '',
    id: 'fff87c7d-ba43-4f31-a74a-0706bc632cf0',
  },
  {
    name: 'Item 3',
    description: '',
    due: '',
    label: '',
    id: '0619c61b-e58b-45a0-b959-e602417994b9',
  },
  {
    name: 'Item 4',
    description: '',
    due: '',
    label: '',
    id: '4e00d113-a1b3-4fdc-9d6e-36ad4f090fbc',
  },
  {
    name: 'Item 5',
    description: '',
    due: '',
    label: '',
    id: '615a403a-41fd-43fc-81d2-7006442184f0',
  },
];

export const navItems = [
  {
    title: 'Inbox',
    to: '/',
    list: () => true,
    icon: <InboxIcon fontSize="small" />,
  },
  {
    title: 'Today',
    to: '/today',
    list: '',
    icon: <TodayIcon fontSize="small" />,
  },
  {
    title: 'Upcoming',
    to: '/upcoming',
    list: '',
    icon: <EventNoteIcon fontSize="small" />,
  },
  {
    title: 'Past Due',
    to: '/due',
    list: '',
    icon: <ScheduleIcon fontSize="small" />,
  },
];
