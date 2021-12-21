import React from 'react';

// mui
import { Grid, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// colors
import { colors } from 'data/colors';

const LabelDisplay = ({ label }) => {
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

export default LabelDisplay;
