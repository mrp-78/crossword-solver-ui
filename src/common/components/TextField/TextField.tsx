import React from 'react';
import style from './TextField.module.scss';
import TextField from '@mui/material/TextField';

interface TextFieldProps {
  label?: string;
  variant?: "standard" | "filled" | "outlined";
  value?: string | number;
  onChange: (event: any) => void;
  onSubmit?: () => void;
  className?: string;
  fullWidth?: boolean;
  type?: string;
}

const TextFieldComponent = ({value, onChange, className, label, variant = 'outlined', fullWidth, type, onSubmit}: TextFieldProps) => {
  return (
    <TextField
      id="text-field"
      label={label}
      variant={variant}
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && onSubmit)
          onSubmit()
        }
      }
      className={`${style.textField} ${className}`}
      value={value}
      type={type}
      fullWidth={fullWidth}
    />
  );
};
export default TextFieldComponent;
