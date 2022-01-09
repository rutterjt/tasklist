import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Box } from '@mui/material';

// components
import Spacebar from './Spacebar';

/**
 * The app's main content layout component.
 * @param {any} children - The app's main content.
 */
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
