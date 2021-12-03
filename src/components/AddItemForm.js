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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PriorityIcon from './PriorityIcon';

// store
import { useStore } from '../store/context';
import { ADD_ITEM } from '../store/actions';

// child components
const AddButton = ({ setFormOpen }) => (
  <Button
    variant="text"
    onClick={() => setFormOpen(true)}
    startIcon={<AddIcon />}
    disableRipple
  >
    Add item
  </Button>
);

const PriorityControl = ({ priority, setPriority }) => {
  const [priorityPopup, setPriorityPopup] = useState(false);
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
            <ListItem>
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

const CustomForm = ({ createItem, closeForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(4);

  const update = (setter) => (e) => setter(e.target.value);
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
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ padding: '1rem', mb: '1rem' }}>
        <Typography component="h3" variant="body1" sx={{ mb: '1rem' }}>
          Add a Task
        </Typography>
        <TextField
          id="task"
          label="Task"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: '1rem' }}
          required
          autoFocus
        />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={update(setDescription)}
          multiline
          fullWidth
          minRows={3}
          variant="outlined"
          sx={{ mb: '1rem' }}
        />
        <PriorityControl priority={priority} setPriority={setPriority} />
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
        <CustomForm createItem={newItem} closeForm={() => setFormOpen(false)} />
      ) : (
        <AddButton setFormOpen={setFormOpen} />
      )}
    </Box>
  );
};

export default AddItemForm;
