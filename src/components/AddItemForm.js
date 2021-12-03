import React, { useState } from 'react';

// mui
import {
  Box,
  Button,
  Paper,
  TextField,
  IconButton,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// mui icons
import DatePicker from '@mui/lab/DatePicker';
import TodayIcon from '@mui/icons-material/Today';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// store
import { useStore } from '../store/context';
import { ADD_ITEM } from '../store/actions';

// date
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';
import add from 'date-fns/add';

// components
import PriorityIcon from './PriorityIcon';

// Add task button: controls whether the form is visible
const AddButton = ({ setFormOpen }) => (
  <Button
    variant="text"
    onClick={() => setFormOpen(true)}
    startIcon={<AddIcon />}
    disableRipple
  >
    Add task
  </Button>
);

// Renders controls for the task's priority
const PriorityControl = ({ priority, setPriority }) => {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleListClick = (num) => {
    setPriority(num);
    handleClose();
  };

  const open = !!anchor;
  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <IconButton aria-label="Set Priority" onClick={handleClick}>
        <PriorityIcon priority={priority} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          {[1, 2, 3, 4].map((num) => (
            <ListItem key={num}>
              <ListItemButton onClick={() => handleListClick(num)}>
                <ListItemIcon>
                  <PriorityIcon priority={num} />
                </ListItemIcon>
                <ListItemText>Priority {num}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

const DateListItem = ({ title, icon, onClick }) => (
  <ListItem>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItemButton>
  </ListItem>
);

// renders the controls for the task's due date
const DateControl = ({ date, setDate }) => {
  const [anchor, setAnchor] = useState(null);
  console.log(new Date());

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
  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <Button onClick={handleClick} variant="outlined">
        {date
          ? isToday(date)
            ? 'Today'
            : isTomorrow(date)
            ? 'Tomorrow'
            : format(date, 'MM/dd/yyyy')
          : 'Schedule'}
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

// renders a text field
const TextControl = ({
  name,
  value,
  onChange,
  required,
  autoFocus,
  lines = 1,
}) => (
  <TextField
    id={name}
    label={name}
    value={value}
    onChange={onChange}
    required={required}
    autoFocus={autoFocus}
    fullWidth
    variant="outlined"
    multiline={lines > 1}
    minRows={lines > 1 ? lines : false}
    sx={{ mb: '1rem' }}
  />
);

// renders the task creation form's ui
const FormDisplay = ({
  handleSubmit,
  closeForm,
  name,
  setName,
  description,
  setDescription,
  priority,
  setPriority,
  date,
  setDate,
}) => {
  const update = (setter) => (e) => setter(e.target.value);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ padding: '1rem', mb: '1rem' }}>
        <Typography component="h3" variant="body1" sx={{ mb: '1rem' }}>
          Add a Task
        </Typography>
        <TextControl
          name="Task"
          value={name}
          onChange={update(setName)}
          required
          autoFocus
        />
        <TextControl
          name="Description"
          value={description}
          onChange={update(setDescription)}
          lines={3}
        />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DateControl date={date} setDate={setDate} />
          </Grid>
          <Grid item>
            <PriorityControl priority={priority} setPriority={setPriority} />
          </Grid>
        </Grid>
      </Paper>
      <Box>
        <Button
          variant="contained"
          sx={{ mr: '1rem' }}
          disableRipple
          disableElevation
          disabled={!name}
          type="submit"
        >
          Add Task
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={closeForm}
          disableRipple
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

// renders the form, maintains all form state
const FormWrapper = ({ createItem, closeForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(4);
  const [date, setDate] = useState(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem({ name, description, priority });
    resetForm();
  };
  return (
    <FormDisplay
      handleSubmit={handleSubmit}
      closeForm={closeForm}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      priority={priority}
      setPriority={setPriority}
      date={date}
      setDate={setDate}
    />
  );
};

// main form control
const AddItemForm = () => {
  const { dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_ITEM,
      payload: { ...data },
    };
  };

  const newItem = (data) => dispatch(itemCreator(data));

  return (
    <Box sx={{ mt: '0.5rem' }}>
      {formOpen ? (
        <FormWrapper
          createItem={newItem}
          closeForm={() => setFormOpen(false)}
        />
      ) : (
        <AddButton setFormOpen={setFormOpen} />
      )}
    </Box>
  );
};

export default AddItemForm;
