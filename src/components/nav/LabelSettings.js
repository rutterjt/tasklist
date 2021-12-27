import React, { useState } from 'react';

// mui
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import { useStore } from 'store/useStore';
import { DELETE_LABEL } from 'store/actions';

// components
import WarningDialog from 'components/WarningDialog';
import CustomDialog from 'components/CustomDialog';
import LabelUpdateForm from 'components/forms/LabelUpdateForm';

const LabelSettings = ({ id }) => {
  const { labels, dispatch } = useStore();
  const label = labels.find((label) => label.id === id) || {};

  const [anchor, setAnchor] = useState(null);
  const [warningOpen, setWarningOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  // event handlers
  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  // store
  const deleteCreator = () => ({
    type: DELETE_LABEL,
    payload: { label },
  });

  const deleteLabel = () => dispatch(deleteCreator());

  // ui
  const openWarning = () => setWarningOpen(true);
  const closeWarning = () => setWarningOpen(false);
  const openEditor = () => setEditorOpen(true);
  const closeEditor = () => {
    setEditorOpen(false);
    handleClose();
  };

  const open = !!anchor;
  const htmlID = open ? 'priority-popup' : undefined;

  return (
    <Box>
      <IconButton aria-label="more options" edge="end" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={htmlID}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={openEditor}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit Label</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={openWarning}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete Label</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CustomDialog open={editorOpen} onClose={closeEditor}>
        <LabelUpdateForm label={label} closeForm={closeEditor} />
      </CustomDialog>
      <WarningDialog
        open={warningOpen}
        title="Delete Label?"
        body="Warning: this cannot be undone."
        handleConfirm={deleteLabel}
        handleCancel={closeWarning}
        confirmLabel="Delete"
      />
    </Box>
  );
};

export default LabelSettings;
