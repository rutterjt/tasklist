import React from 'react';
import { Chip } from '@mui/material';

const ShortChip = (props) => (
  <Chip {...props} sx={{ '&.MuiChip-root': { height: '24px' } }} />
);

export default ShortChip;
