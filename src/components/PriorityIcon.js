import React from 'react';

import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { indigo, purple, red } from '@mui/material/colors';

const flagColors = [null, red[500], purple[500], indigo[500], indigo[500]];

const PriorityIcon = ({ priority = 4 }) => {
  console.log(priority);
  if (priority >= 4) {
    return <FlagOutlinedIcon />;
  } else {
    return <FlagIcon sx={{ color: flagColors[priority] }} />;
  }
};

export default PriorityIcon;
