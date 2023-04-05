import React from 'react';
import MainLayout from "../../common/layouts/MainLayout/MainLayout";
import style from './Demo.module.scss';
import Select from "common/components/Select";
import Button from "common/components/Button";
import CrosswordContainer from "common/components/Crossword";
import {crosswordProps, crosswordsProps} from "common/types";

export type LoginPresentationProps = {
  crosswords: crosswordsProps;
  selectedCrossword?: crosswordProps;
  isLoadingCrossword: boolean;
  showAnswer: boolean;
  handleChangeCrossword: (event: any) => void;
  handleSolveClick: () => void;
};

const DemoPresentation = ({crosswords, selectedCrossword, handleChangeCrossword, isLoadingCrossword, showAnswer, handleSolveClick}: LoginPresentationProps) => {
  return (
    <MainLayout>
      <div className={style.pageContainer}>
        <h1 className={style.title}>
          مشاهده دمو جدول‌باز
        </h1>
        <p className={style.content}>
          برای مشاهده نمونه عملکرد جدول‌باز در حل جدول بر روی جدول‌های کلاسیک سایت
          {' '}
          <a href="https://www.jadvalyab.ir/halejadval/classic" rel="nofollow" target="_blank">جدول‌یاب</a>
          {' '}
          از بخش زیر یک جدول را انتخاب کرده و سپس بر روی دکمه حل جدول کلیک کنید:
        </p>
        <div className={style.row}>
          <Select label={'جدول'} value={selectedCrossword?.key} onChange={handleChangeCrossword} items={crosswords} className={style.crosswordSelect} />
          <Button text={'حل جدول'} onClick={handleSolveClick} />
        </div>
        {!isLoadingCrossword && selectedCrossword?.key ?
          <CrosswordContainer
            {...selectedCrossword}
            disabled
            showAnswer={showAnswer}
          /> : null
        }
      </div>
    </MainLayout>
  );
};

export default DemoPresentation;
