import React from 'react';

// mui
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

// colors
import { colors, ColorType, isColor } from '../../data/colors';

const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

type Props = {
  color: ColorType | '';
  setColor: React.Dispatch<React.SetStateAction<ColorType | ''>>;
};

/**
 * A form control to handle picking a color.
 */
export const ColorField: React.FC<Props> = ({ color, setColor }) => {
  const handleChange = (e: SelectChangeEvent) => {
    const testColor = e.target.value;
    if (isColor(testColor)) {
      setColor(testColor);
    }
  };

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
        <MenuItem value={''}>No color</MenuItem>
        {Object.keys(colors).map((key, index) => (
          <MenuItem key={index} value={key}>
            <SquareRoundedIcon
              sx={{ color: colors[key as keyof typeof colors], mr: 2 }}
            />{' '}
            {capitalize(key)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
