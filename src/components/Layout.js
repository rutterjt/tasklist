import React from 'react';

// mui
import { Box } from '@mui/material';

// components
import Spacebar from './Spacebar';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        pl: '2rem',
        pr: '2rem',
        pb: '2rem',
        maxWidth: '600px',
      }}
    >
      <Spacebar />

      {children}
    </Box>
  );
};

export default Layout;
