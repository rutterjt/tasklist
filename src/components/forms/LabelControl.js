import React from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// proptypes
import PropTypes from 'prop-types';

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

// store
import { selectLabelsAsList } from '../../store/slices/labelsSlice';

// colors
import { colors } from '../../data/colors';

// components
import ListHeader from '../ListHeader';

// hooks
import { usePopover } from '../../hooks/usePopover';

/**
 * A form control to handle adding a label to a task.
 * @param {string} label - A label object.
 * @param {function} setLabel - A setter for task.label.
 */
const LabelControl = ({ label, setLabel }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();
  const labels = useSelector(selectLabelsAsList, shallowEqual);

  const handleClick = (label) => {
    setLabel(label);
    handleClose();
  };

  const clearLabel = () => {
    setLabel(undefined);
    handleClose();
  };

  const id = open ? 'label-popup' : undefined;

  return (
    <Box>
      {label ? (
        <Button
          onClick={handleOpen}
          sx={(theme) => ({
            color: theme.palette.text.primary,
            textTransform: 'capitalize',
            fontWeight: 'normal',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          })}
          startIcon={<LocalOfferIcon sx={{ color: colors[label.color] }} />}
        >
          {label.name}
        </Button>
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
          {labels.map((label) => {
            const { name, color, id } = label;
            return (
              <ListItem key={id} sx={{ p: 0 }}>
                <ListItemButton onClick={() => handleClick(label)}>
                  <ListItemIcon>
                    <LocalOfferIcon sx={{ color: colors[color] }} />
                  </ListItemIcon>
                  <ListItemText>{name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider />
          <ListItem key={id} sx={{ p: 0 }}>
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
  label: PropTypes.object,
  setLabel: PropTypes.func.isRequired,
};

export default LabelControl;
