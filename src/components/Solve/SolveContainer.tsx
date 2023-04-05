import React, {useState, useEffect} from 'react';
import SolvePresentation from './SolvePresentation';
import {crosswordProps, questionProps} from "common/types";

export const steps = {
  INITIAL: 'INITIAL',
  GET_QUESTIONS: 'GET_QUESTIONS',
  GET_ANSWERS: 'GET_ANSWERS'
}

const SolveContainer = () => {
  const [step, setStep] = useState(steps.INITIAL);
  const [crossword, setCrossword] = useState<crosswordProps>({
    key: 'custom',
    name: 'جدول',
    rows: 5,
    columns: 5,
    questions: {
      horizontal: [
        [],
        [],
        [],
        [],
        []
      ],
      vertical: [
        [],
        [],
        [],
        [],
        []
      ]
    },
    blackBlocks: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]
  })
  const [question, setQuestion] = useState<questionProps>({
    question: 0,
    part: -1,
    direction: 'horizontal'
  })
  const [questionText, setQuestionText] = useState<string>('');
  const [selectedBlocks, setSelectedBlocks] = useState<Array<{row: number; col: number}>>([]);

  const handleChangeRows = (event: any) => {
    const rows = Number(event.target.value);
    let newCrossword = {...crossword, rows};
    let blocks = [];
    let horizontal = [];
    for (let i = 0; i < rows; i += 1) {
      blocks.push(Array(crossword.columns));
      horizontal.push([]);
    }
    newCrossword.blackBlocks = blocks;
    newCrossword.questions.horizontal = horizontal;
    setCrossword(newCrossword);
  }

  const handleChangeColumns = (event: any) => {
    const columns = Number(event.target.value);
    let newCrossword = {...crossword, columns};
    let blocks = [];
    let vertical = [];
    for (let i = 0; i < crossword.rows; i += 1) {
      blocks.push(Array(columns));
    }
    for (let i = 0; i < columns; i += 1) {
      vertical.push([]);
    }
    newCrossword.blackBlocks = blocks;
    newCrossword.questions.vertical = vertical;
    setCrossword(newCrossword);
  }

  const handleChangeBlockStatus = (row: number, column: number) => {
    let newCrossword = {...crossword};
    crossword.blackBlocks[row][column] = !crossword.blackBlocks[row][column];
    setCrossword(newCrossword);
  }

  const handleChangeQuestionText = (event: any) => {
    setQuestionText(event.target.value);
  }

  const gotoNextStep = () => {
    switch (step) {
      case steps.INITIAL:
        gotoNextQuestion();
        setStep(steps.GET_QUESTIONS);
        break;
      case steps.GET_QUESTIONS:
        setStep(steps.GET_ANSWERS);
        break;
    }
  }

  const gotoPrevStep = () => {
    switch (step) {
      case steps.GET_ANSWERS:
        setStep(steps.GET_QUESTIONS);
        break;
      case steps.GET_QUESTIONS:
        setStep(steps.INITIAL);
        break;
    }
  }

  const gotoNextQuestion = () => {
    if (question.question >= 0 && question.part >= 0) {
      let newCrossword = {...crossword};
      newCrossword.questions[question.direction][question.question].push(questionText);
      setCrossword(newCrossword);
    }
    setQuestionText('');
    const {rows, columns, blackBlocks} = crossword;
    let blocks: Array<{row: number; col: number}> = [];
    let newQuestion = {...question};
    while (true) {
      let part = 0;
      if (newQuestion.direction === 'horizontal') {
        for (let i = 0; i < columns; i += 1) {
          if (blackBlocks[newQuestion.question][i]) {
            if (blocks.length > 1) {
              if (part > newQuestion.part) {
                setSelectedBlocks(blocks);
                setQuestion({...newQuestion, part})
                return;
              } else {
                blocks = [];
                part += 1;
              }
            } else {
              blocks = [];
              continue;
            }
          } else {
            blocks.push({row: newQuestion.question, col: i});
          }
        }
        if (blocks.length > 1 && part > newQuestion.part) {
          setSelectedBlocks(blocks);
          setQuestion({...newQuestion, part})
          return;
        } else {
          part = 0;
          newQuestion.question += 1;
          newQuestion.part = -1;
          blocks = [];
          if (newQuestion.direction === 'horizontal' && newQuestion.question >= rows) {
            newQuestion.direction = 'vertical';
            newQuestion.question = 0;
          }
        }
      }
      else if (newQuestion.direction === 'vertical') {
        for (let i = 0; i < rows; i += 1) {
          if (blackBlocks[i][newQuestion.question]) {
            if (blocks.length > 1) {
              if (part > newQuestion.part) {
                setSelectedBlocks(blocks);
                setQuestion({...newQuestion, part})
                return;
              } else {
                blocks = [];
                part += 1;
              }
            } else {
              blocks = [];
              continue;
            }
          } else {
            blocks.push({col: newQuestion.question, row: i});
          }
        }
        if (blocks.length > 1 && part > newQuestion.part) {
          setSelectedBlocks(blocks);
          setQuestion({...newQuestion, part})
          return;
        } else {
          part = 0;
          newQuestion.question += 1;
          newQuestion.part = -1;
          blocks = [];
          if (newQuestion.question >= columns) {
            newQuestion = {question: 0, part: -1, direction: 'horizontal'};
            setQuestion(newQuestion);
            setSelectedBlocks([]);
            gotoNextStep();
            return;
          }
        }
      }
    }
  }

  return (
    <SolvePresentation
      step={step}
      crossword={crossword}
      question={question}
      selectedBlocks={selectedBlocks}
      questionText={questionText}
      handleChangeRows={handleChangeRows}
      handleChangeColumns={handleChangeColumns}
      handleChangeBlockStatus={handleChangeBlockStatus}
      handleChangeQuestionText={handleChangeQuestionText}
      gotoNextStep={gotoNextStep}
      gotoPrevStep={gotoPrevStep}
      gotoNextQuestion={gotoNextQuestion}
    />
  );
};
export default SolveContainer;
