import React from 'react';

// mui
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { indigo, purple, red } from '@mui/material/colors';

const flagColors = [null, red[500], purple[500], indigo[500], indigo[500]];

const PriorityIcon = ({ priority = 4 }) => {
  if (priority >= 4) {
    return <FlagOutlinedIcon sx={{ display: 'block' }} />;
  } else {
    return <FlagIcon sx={{ display: 'block', color: flagColors[priority] }} />;
  }
};

export default PriorityIcon;
