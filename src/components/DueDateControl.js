import React, { useState } from 'react';

// mui
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Popover,
  TextField,
  Divider,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

// mui icons
import TodayIcon from '@mui/icons-material/Today';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// date-fns
import add from 'date-fns/add';

// utils
import { displayDate } from '../utils/date';

const DateListItem = ({ title, icon, onClick }) => (
  <ListItem>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItemButton>
  </ListItem>
);

// renders the controls for the task's due date
const DueDateControl = ({ date, setDate }) => {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const open = !!anchor;
  const id = open ? 'date-popup' : undefined;
  return (
    <Box>
      <Button onClick={handleClick} variant="outlined">
        {displayDate(date)}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ pt: '1rem', pb: '1rem' }}>
          <DatePicker
            label="Due Date"
            value={date}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            renderInput={(params) => (
              <TextField size="small" sx={{ m: '1rem' }} {...params} />
            )}
            minDate={Date.now()}
          />
          <List dense>
            <Divider />
            <DateListItem
              title="Today"
              icon={<TodayIcon color="success" />}
              onClick={() => handleDateChange(new Date())}
            />
            <DateListItem
              title="Tomorrow"
              icon={<UpcomingIcon color="warning" />}
              onClick={() => handleDateChange(add(new Date(), { days: 1 }))}
            />
            <DateListItem
              title="Next Week"
              icon={<InsertInvitationIcon color="secondary" />}
              onClick={() => handleDateChange(add(new Date(), { weeks: 1 }))}
            />
            <Divider />
            <DateListItem
              title="No Date"
              icon={<DoNotDisturbAltIcon />}
              onClick={() => handleDateChange(null)}
            />
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default DueDateControl;
