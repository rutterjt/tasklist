import React, { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// mui
import { ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components
import { CollapseList, CustomDialog } from '../../components';
import NavLabelItem from './NavLabelItem';
import LabelCreateForm from '../labels/LabelCreateForm';

// store
import { selectLabelIds } from '../labels/labelsSlice';

type ButtonProps = {
  onClick: () => void;
};

const AddLabelButton: React.FC<ButtonProps> = ({ onClick }) => (
  <IconButton edge="end" aria-label="add label" onClick={onClick}>
    <AddIcon />
  </IconButton>
);

/**
 * Dynamically renders a list of nav links, one for each label the user has created, linking to the label's page.
 */
const NavLabelsList: React.FC = () => {
  const labelIds = useSelector(selectLabelIds);
  const [editing, setEditing] = useState(false);

  const handleAddLabel = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };

  const listContent = labelIds.length ? (
    <>
      {labelIds.map((id) => (
        <NavLabelItem labelId={id} key={id} />
      ))}
    </>
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
