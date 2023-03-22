import React from 'react';
import style from './Crossword.module.scss';
import {crosswordProps} from "common/types";
import Block from "common/components/Crossword/Block/Block";

type CrosswordProps = crosswordProps & {
  answers?: Array<Array<string>>;
  disabled: boolean
  onClickBlock: (i: number, j: number) => void;
  selectedQuestion: { question: number; part: number; direction: 'horizontal' | 'vertical' };
  selectedBlocks: Array<{row: number; col: number}>;
}

const CrosswordPresentation = ({rows, columns, questions, blackBlocks, answers, disabled, onClickBlock, selectedQuestion, selectedBlocks}: CrosswordProps) => {
  return  (
    <div className={style.crossword}>
      <div className={`${style.twoColumn} ${style.questions}`}>
            <div>
              <p className={style.bold}>افقی:</p>
              <ol>
                {questions?.horizontal.map((question, row) =>
                  <li key={question.join(' - ')}>
                    {question.map((part, index) => (
                      <>
                        <span>{index > 0 ? ' - ': ''}</span>
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
              <p className={style.bold}>عمودی:</p>
              <ol>
                {questions?.vertical.map((question, column) =>
                  <li key={question.join(' - ')}>
                    {question.map((part, index) => (
                      <>
                        <span>{index > 0 ? ' - ': ''}</span>
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
