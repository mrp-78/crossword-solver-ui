import React, { useState, useEffect } from 'react';
import {crosswordProps, questionProps} from "common/types";
import CrosswordPresentation from "common/components/Crossword/CrosswordPresentation";

type CrosswordProps = crosswordProps & {
  answers?: Array<Array<string>>;
  disabled?: boolean
  showAnswer?: boolean;
  onClickBlock?: (i: number, j: number) => void;
  _selectedBlock?: Array<{row: number; col: number}>
}

const CrosswordContainer = ({key, rows, columns, questions, blackBlocks, answers, disabled, onClickBlock, showAnswer, _selectedBlock = []}: CrosswordProps) => {
  const [runAnimation, setRunAnimation] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<questionProps>({
    question: 0,
    part: -1,
    direction: 'horizontal'
  });
  const [currentAnswers, setCurrentAnswers] = useState<string[][]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<Array<{row: number; col: number}>>([]);

  const onClick = (i: number, j: number) => {
    if (!disabled && onClickBlock)
      onClickBlock(i, j);
  }

  const calculateSelectedBlocksAndAnswers = (question: {question: number; part: number, direction: 'horizontal' | 'vertical'}) => {
    let blocks = [];
    let part = 0;
    let first = true;
    if (question.direction === 'horizontal') {
      for (let i = 0; i < columns; i += 1) {
        if (blackBlocks[question.question][i]) {
          if (blocks.length > 0)
            break;
          else {
            if (!first) part += 1;
            first = true;
            continue;
          }
        }
        if (blocks.length === 0 && blackBlocks?.[question.question]?.[i+1] && first) {
          part -= 1;
          first = false;
          continue
        }
        first = false;
        if (question.part === part) {
          blocks.push({row: question.question, col:i})
        }
      }
    }
    else {
      for (let i = 0; i < rows; i += 1) {
        if (blackBlocks[i][question.question]) {
          if (blocks.length > 0)
            break;
          else {
            if (!first) part += 1;
            first = true;
            continue;
          }
        }
        if (blocks.length === 0 && blackBlocks?.[i+1]?.[question.question] && first) {
          part -= 1;
          first = false;
          continue
        }
        first = false;
        if (question.part === part) {
          blocks.push({col: question.question, row:i})
        }
      }
    }
    setSelectedBlocks(blocks);
    if (!blocks.find(block => {
      const ans = answers?.[block.row][block.col];
      return (!ans || ans === '' || ans === ' ');
    })) {
      let newAnswers = [...currentAnswers.map((item) => item.slice())];
      blocks.forEach(block => {
        newAnswers[block.row][block.col] = answers?.[block.row][block.col] || ''
      })
      setCurrentAnswers(newAnswers);
    }
  }

  useEffect(() => {
    if (!showAnswer) {
      setRunAnimation(true);
      return;
    }
    if (!runAnimation) return;
    const timer = setTimeout(() => {
      const {question, part, direction} = selectedQuestion;
      let newSelectedQuestion = {...selectedQuestion};
      if (questions?.[direction]?.[question]?.[part+1]) {
        newSelectedQuestion.part = part + 1
      }
      else if (questions?.[direction]?.[question+1]?.[0]) {
        newSelectedQuestion.part = 0
        newSelectedQuestion.question = question + 1
      }
      else if (direction === 'horizontal' && questions?.['vertical']?.[0]?.[0]) {
        newSelectedQuestion.part = 0
        newSelectedQuestion.question = 0
        newSelectedQuestion.direction = 'vertical'
      }
      else {
        setRunAnimation(false);
        newSelectedQuestion.part = -1
        newSelectedQuestion.question = 0
        newSelectedQuestion.direction = 'horizontal'
      }
      calculateSelectedBlocksAndAnswers(newSelectedQuestion)
      setSelectedQuestion(newSelectedQuestion);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showAnswer, selectedQuestion]);

  useEffect(() => {
    let arr = [];
    const cols = Array(columns);
    for (let i = 0; i< rows; i += 1) {
      arr.push(cols)
    }
    setCurrentAnswers(arr);
  }, [rows, columns, key])

  useEffect(() => {
    if (_selectedBlock?.length > 0)
      setSelectedBlocks(_selectedBlock);
  }, [_selectedBlock])

  return  (
    <CrosswordPresentation
      key={key}
      rows={rows}
      columns={columns}
      questions={questions}
      answers={currentAnswers}
      blackBlocks={blackBlocks}
      disabled={disabled || false}
      onClickBlock={onClick}
      selectedQuestion={selectedQuestion}
      selectedBlocks={selectedBlocks}
    />
  );
};

export default CrosswordContainer;
