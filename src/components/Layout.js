import React from 'react';

// mui
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        pl: { md: '2rem' },
        pr: '2rem',
        pb: '2rem',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
