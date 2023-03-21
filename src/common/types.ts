export type crosswordsProps = Array<{key: string, value: string}>;

export type crosswordProps = {
  key?: string;
  rows?: number;
  columns?: number;
  questions?: {
    horizontal: Array<Array<string>>;
    vertical: Array<Array<string>>;
  };
  blackBlocks?: Array<Array<boolean>>;
  answers?: Array<Array<string>>;
}
