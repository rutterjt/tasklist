import React from 'react';

// mui
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { indigo, purple, red } from '@mui/material/colors';

const flagColors = [null, red[500], purple[500], indigo[500], indigo[500]];

type Props = {
  priority: 0 | 1 | 2 | 3 | 4;
};

/**
 * Renders a flag icon to display a priority value. The icon's color changes based on the priority.
 */
export const PriorityIcon: React.FC<Props> = ({ priority }) => {
  const ariaLabel = `Priority ${priority}`;
  if (priority >= 4) {
    return (
      <FlagOutlinedIcon sx={{ display: 'block' }} aria-label={ariaLabel} />
    );
  } else {
    return (
      <FlagIcon
        sx={{ display: 'block', color: flagColors[priority] }}
        aria-label={ariaLabel}
      />
    );
  }
};
