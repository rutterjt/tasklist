import React from 'react';

// mui
import { ListItem, ListItemText } from '@mui/material';

/**
 * Renders a styled header for lists.
 * @param {any} children - The header's text
 */
export const ListHeader: React.FC = ({ children }) => (
  <ListItem>
    <ListItemText>
      <span style={{ fontWeight: 'bold' }}>{children}</span>
    </ListItemText>
  </ListItem>
);
