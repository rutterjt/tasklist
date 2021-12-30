import React from 'react';

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
import { useStore } from '../../store/useStore';
import { DELETE_LABEL } from '../../store/actions';

// hooks
import { usePopup } from '../../hooks/usePopup';
import { usePopover } from '../../hooks/usePopover';

// components
import WarningDialog from '../WarningDialog';
import CustomDialog from '../CustomDialog';
import LabelUpdateForm from '../forms/LabelUpdateForm';

const LabelSettings = ({ id }) => {
  const { labels, dispatch } = useStore();
  const label = labels.find((label) => label.id === id) || {};

  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor] = usePopup(false);
  const [settingsAnchor, openSettings, closeSettings, settingsOpen] =
    usePopover(null);

  // event handlers
  const confirmClose = () => {
    closeEditor();
    closeSettings();
  };

  // store
  const deleteCreator = () => ({
    type: DELETE_LABEL,
    payload: { label },
  });

  const deleteLabel = () => dispatch(deleteCreator());

  const htmlID = settingsOpen ? 'priority-popup' : undefined;

  return (
    <Box>
      <IconButton aria-label="more options" edge="end" onClick={openSettings}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={htmlID}
        open={settingsOpen}
        anchorEl={settingsAnchor}
        onClose={closeSettings}
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
      <CustomDialog open={editorOpen} onClose={confirmClose}>
        <LabelUpdateForm label={label} closeForm={confirmClose} />
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
