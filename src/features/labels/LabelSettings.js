import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

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
import { labelDeleted } from './labelsSlice';

// hooks
import { usePopup } from '../../hooks/usePopup';
import { usePopover } from '../../hooks/usePopover';

// components
import { WarningDialog, CustomDialog } from '../../components';
import LabelUpdateForm from './LabelUpdateForm';

/**
 * Renders the UI for editing labels.
 *
 * Initially renders a button that, when pressed, renders a PopOver with options to edit or delete the label.
 *
 * @param {string} labelId - The id of the label to update.
 */
const LabelSettings = ({ labelId }) => {
  const dispatch = useDispatch();

  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor] = usePopup(false);
  const [settingsAnchor, openSettings, closeSettings, settingsOpen] =
    usePopover(null);

  // event handlers
  const confirmClose = () => {
    closeEditor();
    closeSettings();
  };

  const deleteLabel = () => dispatch(labelDeleted(labelId));

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
        <LabelUpdateForm labelId={labelId} closeForm={confirmClose} />
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

LabelSettings.propTypes = {
  labelId: PropTypes.string.isRequired,
};

export default LabelSettings;
