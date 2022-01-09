import React, { useState } from 'react';

// mui
import { ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components
import CollapseList from '../CollapseList';
import NavLabelItem from './NavLabelItem';
import LabelCreateForm from '../forms/LabelCreateForm';
import CustomDialog from '../CustomDialog';

// store
import { useStore } from '../../store/useStore';

const AddLabelButton = ({ onClick }) => (
  <Tooltip title="New label">
    <IconButton edge="end" aria-label="new label" onClick={onClick}>
      <AddIcon />
    </IconButton>
  </Tooltip>
);

/**
 * A modified NavList for rendering NavLabels.
 */
const NavLabelsList = () => {
  const { labels } = useStore();
  const [editing, setEditing] = useState(false);

  const handleAddLabel = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };

  return (
    <>
      <CollapseList
        label="Labels"
        secondaryAction={<AddLabelButton onClick={handleAddLabel} />}
      >
        {labels.length ? (
          <div>
            {labels.map((label) => (
              <NavLabelItem label={label} key={label.id} />
            ))}
          </div>
        ) : (
          <ListItem>
            <ListItemText primary="You don't have any labels yet. Press the button to create some!" />
          </ListItem>
        )}
      </CollapseList>
      <CustomDialog open={editing} onClose={handleClose}>
        <LabelCreateForm closeForm={handleClose} />
      </CustomDialog>
    </>
  );
};

export default NavLabelsList;
