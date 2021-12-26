import React, { useState } from 'react';

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
import { useStore } from 'store/useStore';

// colors
import { colors } from 'data/colors';

const LabelControl = ({ label, setLabel }) => {
  const [anchor, setAnchor] = useState(null);
  const { labels } = useStore();

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleListClick = (label) => {
    setLabel(label);
    handleClose();
  };

  const clearLabel = () => {
    setLabel(undefined);
    handleClose();
  };

  const open = !!anchor;
  const id = open ? 'label-popup' : undefined;

  return (
    <Box>
      {label ? (
        <Button
          onClick={handleClick}
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
        <IconButton aria-label="Set label" onClick={handleClick}>
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
          <ListItem>
            <ListItemText>
              <span style={{ fontWeight: 'bold' }}>Label</span>
            </ListItemText>
          </ListItem>
          <Divider />
          {labels.map((label) => {
            const { name, color, id } = label;
            return (
              <ListItem key={id} sx={{ p: 0 }}>
                <ListItemButton onClick={() => handleListClick(label)}>
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

export default LabelControl;
