import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Grid, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// colors
import { colors } from '../data/colors';

/**
 * Renders a label, with a colored tag.
 * @param {object} label - A label object.
 */
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

LabelDisplay.propTypes = {
  label: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LabelDisplay;
