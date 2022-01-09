import React, { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// mui
import { ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components
import CollapseList from '../CollapseList';
import NavLabelItem from './NavLabelItem';
import LabelCreateForm from '../forms/LabelCreateForm';
import CustomDialog from '../CustomDialog';

// store
import { selectLabelIds } from '../../store/slices/labelsSlice';

const AddLabelButton = ({ onClick }) => (
  <IconButton edge="end" aria-label="add label" onClick={onClick}>
    <AddIcon />
  </IconButton>
);

/**
 * A modified NavList for rendering NavLabels.
 */
const NavLabelsList = () => {
  const labelIds = useSelector(selectLabelIds);
  const [editing, setEditing] = useState(false);

  const handleAddLabel = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };

  const listContent = labelIds.length ? (
    <div>
      {labelIds.map((id) => (
        <NavLabelItem id={id} key={id} />
      ))}
    </div>
  ) : (
    <ListItem>
      <ListItemText primary="You don't have any labels yet. Press the button to create some!" />
    </ListItem>
  );

  return (
    <>
      <CollapseList
        label="Labels"
        secondaryAction={<AddLabelButton onClick={handleAddLabel} />}
      >
        {listContent}
      </CollapseList>
      <CustomDialog open={editing} onClose={handleClose}>
        <LabelCreateForm closeForm={handleClose} />
      </CustomDialog>
    </>
  );
};

export default NavLabelsList;
