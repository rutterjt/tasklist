import React from 'react';

// mui
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

import { colors } from 'data/colors';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const ColorDropdownControl = ({ color, setColor }) => {
  const handleChange = (e) => setColor(e.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel id="color-dropdown-label">Label Color</InputLabel>
      <Select
        labelId="color-dropdown-label"
        id="color-dropdown"
        value={color || ''}
        onChange={handleChange}
        label="Label Color"
        sx={{
          '& .MuiSelect-select': { display: 'flex' },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '250px',
            },
          },
        }}
      >
        <MenuItem value={undefined}>No color</MenuItem>
        {Object.keys(colors).map((key, index) => (
          <MenuItem key={key} value={key}>
            <SquareRoundedIcon sx={{ color: colors[key], mr: 2 }} />{' '}
            {capitalize(key)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorDropdownControl;
