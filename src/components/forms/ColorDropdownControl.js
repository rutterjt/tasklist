import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

// colors
import { colors } from '../../data/colors';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

/**
 * A form control to handle picking a color.
 * @param {string} color - A color string.
 * @param {function} setColor - A setter for the color string.
 */
const ColorDropdownControl = ({ color, setColor }) => {
  const handleChange = (e) => setColor(e.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel id="color-dropdown-label">Label Color</InputLabel>
      <Select
        labelId="color-dropdown-label"
        id="color-dropdown"
        value={color}
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

ColorDropdownControl.defaultProps = {
  color: '',
};

ColorDropdownControl.propTypes = {
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
};

export default ColorDropdownControl;
