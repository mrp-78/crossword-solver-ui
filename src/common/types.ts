export type crosswordsProps = Array<crosswordProps>;

export type crosswordProps = {
  key: string;
  name: string;
  rows: number;
  columns: number;
  questions: {
    horizontal: Array<Array<string>>;
    vertical: Array<Array<string>>;
  };
  blackBlocks: Array<Array<boolean>>;
  answers?: Array<Array<string>>;
}

export type questionProps = {
  direction: 'horizontal' | 'vertical';
  question: number;
  part: number;
}
