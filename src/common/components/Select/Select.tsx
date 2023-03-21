import React from 'react';
import style from './Select.module.scss';

interface SelectProps {
  value?: string;
  onChange: (event: any) => void;
  items?: Array<{key: string, value: string}>;
  className?: string;
}

const Select = ({value, onChange, items, className}: SelectProps) => {
  return (
    <select
      id="crossword-select"
      value={value}
      onChange={onChange}
      className={`${style.select} ${className}`}
    >
      {items && items.map(item => <option key={item.key}>{item.value}</option>)}
    </select>
  );
};
export default Select;
