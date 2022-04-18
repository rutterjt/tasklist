import React from 'react';
import { useAppSelector } from '../../app/hooks';

// mui
import { Grid, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// colors
import { colors } from '../../data/colors';

import { selectLabelById } from './labelsSlice';

type Props = {
  labelId: string;
};

/**
 * Renders a label, with a colored tag.
 */
export const LabelDisplay: React.FC<Props> = ({ labelId }) => {
  const label = useAppSelector((state) => selectLabelById(state, labelId));
  const { color, name } = label;
  return (
    <Grid container alignItems="center">
      <Grid item sx={{ mr: 1, height: 'auto' }}>
        <LocalOfferIcon
          fontSize="small"
          sx={{ display: 'block', color: colors[color] }}
        />
      </Grid>
      <Grid item>
        <Typography variant="body2">{name}</Typography>
      </Grid>
    </Grid>
  );
};
