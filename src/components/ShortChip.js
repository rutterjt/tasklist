import React from 'react';

// mui
import { Chip } from '@mui/material';

/**
 * A custom MUI Chip component
 * @param {object} props - Passed directly to the underlying MUI <Chip> component.
 */
const ShortChip = (props) => (
  <Chip {...props} sx={{ '&.MuiChip-root': { height: '24px' } }} />
);

export default ShortChip;
