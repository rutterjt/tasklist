import React from 'react';

// mui
import { Toolbar } from '@mui/material';

/**
 * Creates spacing under the main site header.
 */
const Spacebar = () => {
  return (
    <>
      <Toolbar />
      <div style={{ marginTop: '1rem', minHeight: '1rem' }}></div>
    </>
  );
};

export default Spacebar;
