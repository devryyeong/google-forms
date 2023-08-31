export interface Option {
  id?: number;
  option?: string;
  isChecked?: boolean;
}

export interface Question {
  id?: number;
  title?: string | undefined;
  type?: string | undefined;
  radio?: Option[] | undefined;
  checkbox?: Option[] | undefined;
  select?: Option[] | undefined;
  isNecessary?: boolean | undefined;
  editMode?: boolean | undefined;
}

export type Questions = Question[];