import React from 'react';

// mui
import { ListItem, ListItemText } from '@mui/material';

const ListHeader = ({ children }) => {
  return (
    <ListItem>
      <ListItemText>
        <span style={{ fontWeight: 'bold' }}>{children}</span>
      </ListItemText>
    </ListItem>
  );
};

export default ListHeader;
