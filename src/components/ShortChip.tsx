import React from 'react';

// mui
import { Chip } from '@mui/material';
import { ChipProps } from '@mui/material/Chip';

/**
 * A custom MUI Chip component
 */
export const ShortChip: React.FC<ChipProps> = (props) => (
  <Chip {...props} sx={{ '&.MuiChip-root': { height: '24px' } }} />
);
