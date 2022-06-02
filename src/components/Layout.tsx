import React from 'react';

// mui
import { Box } from '@mui/material';

// components
import Spacebar from './Spacebar';

/**
 * The app's main content layout component.
 */
export const Layout: React.FC = ({ children }) => (
  <Box
    sx={{
      pl: { xs: 2, sm: 4, lg: 8 },
      pr: { xs: 2, sm: 4 },
      pb: 4,
      maxWidth: '600px',
    }}
  >
    <Spacebar />

    {children}
  </Box>
);

export default Layout;
