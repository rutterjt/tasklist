import React from 'react';

// mui
import { Chip, ChipTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

/**
 * A custom MUI Chip component
 */
export const ShortChip: OverridableComponent<ChipTypeMap<{}, 'div'>> = (
  props: any
) => <Chip {...props} sx={{ '&.MuiChip-root': { height: '24px' } }} />;

export default ShortChip;
