import React from 'react';
import style from './Crossword.module.scss';
import {crosswordProps, questionProps} from "common/types";
import Block from "common/components/Crossword/Block/Block";

type CrosswordProps = crosswordProps & {
  answers?: Array<Array<string>>;
  disabled: boolean
  onClickBlock: (i: number, j: number) => void;
  selectedQuestion: questionProps;
  selectedBlocks: Array<{row: number; col: number}>;
}

const CrosswordPresentation = ({key, rows, columns, questions, blackBlocks, answers, disabled, onClickBlock, selectedQuestion, selectedBlocks}: CrosswordProps) => {
  return  (
    <div className={style.crossword}>
      <div className={`${style.twoColumn} ${style.questions}`}>
        <div>
          {questions?.horizontal.length > 0 ? <p className={style.bold}>افقی:</p> : null}
          <ol>
            {questions?.horizontal.map((question, row) =>
              <li key={row}>
                {question.map((part, index) => (
                  <>
                    {index > 0 ? '-': ''}
                    <span className={`${selectedQuestion.direction === 'horizontal' && selectedQuestion.question === row && selectedQuestion.part === index ? style.selectedQuestion : '' }`}>
                      {part}
                    </span>
                  </>
                ))}
              </li>
            )}
          </ol>
        </div>
        <div>
          {questions?.vertical.length ? <p className={style.bold}>عمودی:</p> : null}
          <ol>
            {questions?.vertical.map((question, column) =>
              <li key={column}>
                {question.map((part, index) => (
                  <>
                    {index > 0 ? '-': ''}
                    <span className={`${selectedQuestion.direction === 'vertical' && selectedQuestion.question === column && selectedQuestion.part === index ? style.selectedQuestion : '' }`}>
                      {part}
                    </span>
                  </>
                ))}
              </li>
            )}
          </ol>
        </div>
      </div>
      <div className={style.crosswordTable}>
        {[...(Array((rows || 0)+1))].map((_, row) =>
          <div className={style.row} key={row}>
            {[...(Array((columns || 0)+1))].map((_, col) => {
              if (row === 0) {
                if (col === 0)
                  return <div key={`${row}-${col}`} />
                else
                  return <div key={`${row}-${col}`}>{col}</div>
              }
              else {
                if (col == 0)
                  return <div key={`${row}-${col}`}>{row}</div>
                else {
                  return (
                    <Block
                      key={key}
                      row={row}
                      col={col}
                      value={answers?.[row - 1]?.[col - 1]}
                      isBlack={Boolean(blackBlocks && blackBlocks[row - 1][col - 1])}
                      disabled={disabled}
                      isSelected={Boolean(selectedBlocks.find(block => block.row === row-1 && block.col === col-1))}
                      onClick={onClickBlock}
                    />
                  );
                }
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrosswordPresentation;
