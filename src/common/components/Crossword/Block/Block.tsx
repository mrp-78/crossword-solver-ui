import React from 'react';
import style from './Block.module.scss';

type BlockProps = {
  row: number;
  col: number;
  value?: string;
  isBlack: boolean;
  disabled: boolean;
  isSelected: boolean;
  onClick: (row: number, col:number) => void;
}

const Block = ({row, col, value, isBlack, disabled, isSelected, onClick}: BlockProps) => {
  return (
    <div
      key={`${row}-${col}`}
      className={`
        ${style.block} ${isBlack ? style.blackBlock : ''} 
        ${disabled ? style.disabledBlock : ''} 
        ${isSelected ? style.selectedBlock : ''}
      `}
      onClick={() => onClick(row-1, col-1)}
    >
      {value || ''}
    </div>
  )
};

export default Block;
