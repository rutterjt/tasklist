import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { indigo, purple, red } from '@mui/material/colors';

const flagColors = [null, red[500], purple[500], indigo[500], indigo[500]];

/**
 * Renders a flag icon to display a priority value. The icon's color changes based on the priority.
 * @param {number} priority - The priority.
 */
const PriorityIcon = ({ priority }) => {
  if (priority >= 4) {
    return <FlagOutlinedIcon sx={{ display: 'block' }} />;
  } else {
    return <FlagIcon sx={{ display: 'block', color: flagColors[priority] }} />;
  }
};

PriorityIcon.defaultProps = {
  priority: 4,
};

PriorityIcon.propTypes = {
  priority: PropTypes.number.isRequired,
};

export default PriorityIcon;
