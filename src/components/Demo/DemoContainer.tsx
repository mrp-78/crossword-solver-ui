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
          rows: 7,
          columns: 7,
          questions: {
            horizontal: [
              ['زور', 'یار آفتابه'],
              ['دوستی', 'رنگ سفید مات'],
              ['شجاعت و دلیری'],
              ['کشت بارانی', 'دوست'],
              ['جنگاور'],
              ['داخل', 'از لوازم آرایش'],
              ['پیش و جلو', 'درون حاشیه']
            ],
              vertical: [
                ['پیوند دادن'],
                ['قرض و دین', 'برنج'],
                ['گلابی'],
                ['حس بویایی', 'یار مرد'],
                ['عنصر شیمیایی فلزی'],
                ['مخفف اگر', 'مزد'],
                ['ازت']
            ]
          },
          blackBlocks: [
            [false, false, false, true, false, false, false],
            [false, false, true, false, false, false, false],
            [false, false, false, false, false, true, false],
            [false, false, false, true, false, false, false],
            [false, true, false, false, false, false, false],
            [false, false, false, false, true, false, false],
            [false, false, false, true, false, false, false],
          ],
          answers:[
            ['ج', 'ب', 'ر', '', 'ل', 'گ', 'ن'],
            ['و', 'د', '', 'ش', 'ی', 'ر', 'ی'],
            ['ش', 'ه', 'ا', 'م', 'ت', '', 'ت'],
            ['', 'ی', 'م', '', 'ی', 'ا', 'ر'],
            ['', '', 'ر', 'ز', 'م', 'ج', 'و'],
            ['د', 'ر', 'و', 'ن', '', 'ر', 'ژ'],
            ['ن', 'ز', 'د', '', '', 'ت', 'ن']
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
