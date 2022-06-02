import React from 'react';

// mui
import { ListItem, ListItemText } from '@mui/material';

/**
 * Renders a styled header for lists.
 */
export const ListHeader: React.FC = ({ children }) => (
  <ListItem>
    <ListItemText>
      <span style={{ fontWeight: 'bold' }}>{children}</span>
    </ListItemText>
  </ListItem>
);

export default ListHeader;
