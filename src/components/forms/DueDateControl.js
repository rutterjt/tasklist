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
import { displayDate } from '../../utils/date';

// components
const DateListItem = ({ title, icon, onClick }) => (
  <ListItem sx={{ p: 0 }}>
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
    newDate === null ? setDate(null) : setDate(newDate.getTime());
  };

  const handleButtonClick = (newDate) => {
    handleDateChange(newDate);
    handleClose();
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
        <Box sx={{ pt: 2 }}>
          <DatePicker
            label="Due Date"
            value={date}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            onAccept={handleClose}
            renderInput={(params) => (
              <TextField size="small" sx={{ m: 2 }} {...params} />
            )}
            minDate={Date.now()}
          />
          <List>
            <Divider />
            <DateListItem
              title="Today"
              icon={<TodayIcon color="success" />}
              onClick={() => handleButtonClick(new Date())}
            />
            <DateListItem
              title="Tomorrow"
              icon={<UpcomingIcon color="warning" />}
              onClick={() => handleButtonClick(add(new Date(), { days: 1 }))}
            />
            <DateListItem
              title="Next Week"
              icon={<InsertInvitationIcon color="secondary" />}
              onClick={() => handleButtonClick(add(new Date(), { weeks: 1 }))}
            />
            <Divider />
            <DateListItem
              title="No Date"
              icon={<DoNotDisturbAltIcon />}
              onClick={() => handleButtonClick(null)}
            />
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default DueDateControl;
