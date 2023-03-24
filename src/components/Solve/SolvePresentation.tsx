import React from 'react';
import MainLayout from "../../common/layouts/MainLayout/MainLayout";
import style from './Solve.module.scss';
import Button from "common/components/Button";
import CrosswordContainer from "common/components/Crossword";
import {crosswordProps, crosswordsProps, questionProps} from "common/types";
import TextField from "common/components/TextField/TextField";
import {steps} from './SolveContainer'

export type SolvePresentationProps = {
  step: string;
  crossword: crosswordProps;
  question: questionProps;
  questionText: string;
  selectedBlocks: Array<{row: number, col: number}>;
  handleChangeRows: (rows: number) => void;
  handleChangeColumns: (columns: number) => void;
  handleChangeBlockStatus: (row: number, column: number) => void;
  handleChangeQuestionText: (event: any) => void;
  gotoNextStep: () => void;
  gotoPrevStep: () => void;
  gotoNextQuestion: () => void;
};

const SolvePresentation = ({step, crossword, question, questionText, selectedBlocks, handleChangeRows, handleChangeColumns, handleChangeBlockStatus, handleChangeQuestionText, gotoNextStep, gotoPrevStep, gotoNextQuestion}: SolvePresentationProps) => {
  return (
    <MainLayout>
      <div className={style.pageContainer}>
        <h1 className={style.title}>
          حل جدول
        </h1>
        {step === steps.INITIAL ?
          <>
            <p className={style.content}>برای حل جدول ابتدا مشخصات جدول مورد نظر را وارد کنید. برای وارد کردن مشخصات جدول ابتدا تعداد سطرها و ستون‌ها را مشخص کرده، سپس بر روی جدول خانه‌های سیاه را مشخص کنید (با کلیک بر روی هر خانه وضعیت آن از سفید به سیاه و برعکس تغییر می‌کند) و در نهایت بر روی دکمه ادامه کلیک کنید:</p>
            <div className={style.row}>
              <TextField type="number" value={crossword.rows} label="تعداد سطرها" onChange={handleChangeRows} />
              <TextField type="number" value={crossword.columns} label="تعداد ستون‌ها" onChange={handleChangeColumns} />
              <Button text={'ادامه'} onClick={gotoNextStep} />
            </div>
          </>
          : null}
        {step === steps.GET_QUESTIONS ?
          <>
            <p className={style.content}>
              لطفا متن سوال مشخص شده را وارد کنید:
              <b className={style.bold}> (
                {`${question.direction === 'horizontal' ? 'افقی' : 'عمودی'} - سوال: ${question.question+1} - بخش: ${question.part+1}`}
                )
              </b>
            </p>
            <div className={style.row}>
              <TextField label="سوال" value={questionText} onChange={handleChangeQuestionText} onSubmit={gotoNextQuestion} fullWidth />
              <Button text={'ادامه'} onClick={gotoNextQuestion} />
            </div>
          </>
          : null}
        <CrosswordContainer
          {...crossword}
          onClickBlock={handleChangeBlockStatus}
          disabled={step !== steps.INITIAL}
          _selectedBlock={selectedBlocks}
          // showAnswer={showAnswer}
        />
      </div>
    </MainLayout>
  );
};

export default SolvePresentation;
