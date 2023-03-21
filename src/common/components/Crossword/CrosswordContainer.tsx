import React from 'react';
import {crosswordProps} from "common/types";
import CrosswordPresentation from "common/components/Crossword/CrosswordPresentation";

type CrosswordProps = crosswordProps & {
  answers?: Array<Array<string>>;
  disabled?: boolean
  showAnswer?: boolean;
  onClickBlock?: (i: number, j: number) => void;
}

const CrosswordContainer = ({rows, columns, questions, blackBlocks, answers, disabled, onClickBlock, showAnswer}: CrosswordProps) => {
  const onClick = (i: number, j: number) => {
    if (!disabled && onClickBlock)
      onClickBlock(i, j);
  }

  return  (
    <CrosswordPresentation
      rows={rows}
      columns={columns}
      questions={questions}
      answers={answers}
      blackBlocks={blackBlocks}
      disabled={disabled || false}
      onClickBlock={onClick}
    />
  );
};

export default CrosswordContainer;
