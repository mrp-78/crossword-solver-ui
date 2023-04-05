import React from 'react';
import style from './Select.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface SelectProps {
  label?: string;
  value?: string;
  onChange: (event: any) => void;
  items?: Array<{key: string, name: string}>;
  className?: string;
}

const SelectComponent = ({value, onChange, items, className, label}: SelectProps) => {
  return (
    <FormControl className={`${style.form} ${className}`}>
      {label && <InputLabel id="select-label">{label}</InputLabel>}
      <Select
        labelId="select-label"
        id="select"
        defaultValue={value}
        value={value}
        label={label}
        onChange={onChange}
        className={style.select}
      >
        {items && items.map(item =>
          <MenuItem key={item.key} value={item.key} className={style.item}>{item.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
export default SelectComponent;
