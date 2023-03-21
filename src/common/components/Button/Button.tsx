import React from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  theme?: 'filled' | 'outline';
  className?: string;
}

const Button = ({text, onClick, theme = 'filled', className}: ButtonProps) => {
  return (
    // @ts-ignore
    <button onClick={onClick} className={`${style.Button} ${style[theme]} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
