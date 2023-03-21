import React, {useState, useEffect} from 'react';
import DemoPresentation from './DemoPresentation';
import { SelectChangeEvent } from '@mui/material/Select';
import {crosswordsProps} from "common/types";
import { useQuery } from 'react-query';
import {getDemoCrosswordByIdUrl} from "common/apisPath";

export type DemoContainerProps = {
  crosswords: crosswordsProps;
}

const DemoContainer = ({crosswords}: DemoContainerProps) => {
  const [selectedCrossword, setSelectedCrossword] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleChangeCrossword = (event: SelectChangeEvent) => {
    setSelectedCrossword(event.target.value as string);
    setShowAnswer(false);
  };

  useEffect(() => {
    if (crosswords)
      setSelectedCrossword(crosswords[0]?.key)
  }, [crosswords])

  const { data, isLoading } = useQuery(['demoCrossword', selectedCrossword], () => {
    return fetch(
      getDemoCrosswordByIdUrl(selectedCrossword)
    )},
    {
      select: (_data) => {
        return {
          key: 'crossword_01',
          rows: 5,
          columns: 5,
          questions: {
            horizontal: [
              ['سوال ۱', 'بخش ۲'],
              ['سوال ۲'],
              ['سوال ۳'],
              ['سوال ۴'],
              ['سوال ۵'],
            ],
              vertical: [
                ['سوال ۱'],
                ['سوال ۲'],
                ['سوال ۳'],
                ['سوال ۴'],
                ['سوال ۵'],
            ]
          },
          blackBlocks: [
            [false, false, true, false, false],
            [true, false, false, false, false],
            [false, false, false, false, true],
            [false, true, false, false, false],
            [false, false, false, false, true],
          ],
          answers:[
            ['ا', 'ن', '', 'ت', 'گ'],
            ['', 'ض', 'ز', 'ح', 'م'],
            ['ظ', '', 'س', 'ا', ''],
            ['ض', '', 'ب', 'ر', ''],
            ['ض', 'ث', 'ذ', 'ش', ''],
          ]
        }
      }
    }
  );

  return (
    <DemoPresentation
      crosswords={crosswords}
      selectedCrossword={data}
      isLoadingCrossword={isLoading}
      showAnswer={showAnswer}
      handleChangeCrossword={handleChangeCrossword}
      handleSolveClick={() => setShowAnswer(true)}
    />
  );
};
export default DemoContainer;
