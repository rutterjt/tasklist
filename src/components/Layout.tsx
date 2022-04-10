import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// mui
import { Box } from '@mui/material';

// components
import { Spacebar } from './Spacebar';

type Props = {
  title: string;
};

/**
 * The app's main content layout component.
 */
export const Layout: React.FC<Props> = ({ title, children }) => (
  <>
    <Helmet>
      <title>All Tasks | TaskList</title>
    </Helmet>
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
  </>
);
