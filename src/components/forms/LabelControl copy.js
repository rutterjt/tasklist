import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

// mui
import {
  Box,
  Button,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import AddIcon from '@mui/icons-material/Add';

// store
import {
  selectLabelIds,
  selectLabelById,
} from '../../features/labels/labelsSlice';

// colors
import { colors } from '../../data/colors';

// components
import ListHeader from '../ListHeader';
import CustomDialog from '../CustomDialog';
import LabelCreateForm from '../../features/labels/LabelCreateForm';

// hooks
import { usePopover } from '../../hooks/usePopover';

/**
 * Renders a label picker option.
 */
const LabelOption = ({ labelId, handleClick }) => {
  const label = useSelector((state) => selectLabelById(state, labelId));
  const { name, color } = label;
  const updateLabel = () => handleClick(labelId);
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton onClick={updateLabel}>
        <ListItemIcon>
          <LocalOfferIcon sx={{ color: colors[color] }} />
        </ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

/**
 * Renders a button to add a new label.
 */
const AddNewLabel = () => {
  const [editing, setEditing] = useState(false);
  const handleAddLabel = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };

  return (
    <>
      <ListItem sx={{ p: 0 }}>
        <ListItemButton onClick={handleAddLabel}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>New Label</ListItemText>
        </ListItemButton>
      </ListItem>
      <CustomDialog open={editing} onClose={handleClose}>
        <LabelCreateForm closeForm={handleClose} />
      </CustomDialog>
    </>
  );
};

/**
 * Displays the currently-selected label as a button (to open the label picker).
 */
const DisplayCurrentLabel = ({ labelId, onClick }) => {
  const label = useSelector((state) => selectLabelById(state, labelId));
  const { name, color } = label;
  return (
    <Button
      aria-label=" "
      onClick={onClick}
      sx={(theme) => ({
        color: theme.palette.text.primary,
        textTransform: 'capitalize',
        fontWeight: 'normal',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
      })}
      startIcon={<LocalOfferIcon sx={{ color: colors[color] }} />}
    >
      {name}
    </Button>
  );
};

/**
 * A form control to handle adding a label to a task.
 * @param {string} labelId - A label id string.
 * @param {function} setLabel - A setter for task.label.
 */
const LabelControl = ({ labelId, setLabel }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();
  const labelIds = useSelector(selectLabelIds);

  const handleClick = (labelId) => {
    setLabel(labelId);
    handleClose();
  };

  const clearLabel = () => {
    setLabel(undefined);
    handleClose();
  };

  const id = open ? 'label-popup' : undefined;

  const labelOptions = labelIds.map((labelId) => (
    <LabelOption key={labelId} labelId={labelId} handleClick={handleClick} />
  ));

  return (
    <Box>
      {labelId ? (
        <DisplayCurrentLabel labelId={labelId} onClick={handleOpen} />
      ) : (
        <IconButton aria-label="Set label" onClick={handleOpen}>
          <LocalOfferOutlinedIcon />
        </IconButton>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListHeader>Label</ListHeader>
          <Divider />
          {labelOptions}
          <Divider />
          <AddNewLabel />
          <Divider />
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={clearLabel}>
              <ListItemIcon>
                <DoNotDisturbAltIcon />
              </ListItemIcon>
              <ListItemText>No Label</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

LabelControl.propTypes = {
  labelId: PropTypes.string,
  setLabel: PropTypes.func.isRequired,
};

export default LabelControl;
