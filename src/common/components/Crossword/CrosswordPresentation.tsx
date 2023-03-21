import React from 'react';
import style from './Crossword.module.scss';
import {crosswordProps} from "common/types";
import Block from "common/components/Crossword/Block/Block";

type CrosswordProps = crosswordProps & {
  answers?: Array<Array<string>>;
  disabled: boolean
  showAnswer?: boolean;
  onClickBlock: (i: number, j: number) => void;
}

const CrosswordPresentation = ({rows, columns, questions, blackBlocks, answers, disabled, onClickBlock, showAnswer}: CrosswordProps) => {
  return  (
    <div className={style.crossword}>
      <div className={`${style.twoColumn} ${style.questions}`}>
            <div>
              <p className={style.bold}>افقی:</p>
              <ol>
                {questions?.horizontal.map(question =>
                  <li key={question.join(' - ')}>{question.join(' - ')}</li>
                )}
              </ol>
            </div>
            <div>
              <p className={style.bold}>عمودی:</p>
              <ol>
                {questions?.vertical.map(question =>
                  <li key={question.join(' - ')}>{question.join(' - ')}</li>
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
                else
                  return (
                    <Block
                      row={row}
                      col={col}
                      value={answers?.[row-1][col-1]}
                      isBlack={Boolean(blackBlocks && blackBlocks[row-1][col-1])}
                      disabled={disabled}
                      isSelected={false}
                      onClick={onClickBlock}
                    />
                  );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrosswordPresentation;
