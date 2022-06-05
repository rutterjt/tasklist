import React, { useState } from 'react';

// mui
import { ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// components
import CollapseList from '../CollapseList';
import NavLabelItem from './NavLabelItem';
import CustomDialog from '../CustomDialog';
import { CreateLabel } from '../forms/CreateLabel';

// store
import { useStore } from '../../store/useStore';

type ButtonProps = {
  onClick: () => void;
};

const AddLabelButton: React.FC<ButtonProps> = ({ onClick }) => (
  <Tooltip title="New Label">
    <IconButton edge="end" aria-label="new label" onClick={onClick}>
      <AddIcon />
    </IconButton>
  </Tooltip>
);

/**
 * A modified NavList for rendering NavLabels.
 */
export const NavLabelsList = () => {
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
        <CreateLabel onDiscard={handleClose} onClose={handleClose} />
      </CustomDialog>
    </>
  );
};

export default NavLabelsList;
