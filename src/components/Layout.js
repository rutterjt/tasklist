import React from 'react';

// mui
import { Box } from '@mui/material';

// components
import Spacebar from './Spacebar';

const Layout = ({ children }) => {
  return (
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
};

export default Layout;
