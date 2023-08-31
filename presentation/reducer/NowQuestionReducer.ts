import { createSlice , PayloadAction} from "@reduxjs/toolkit";

import { Question } from "../type/question";

const initialState: Question = {
  id: 1,
  title: "제목없는 질문",
  type: "단답형",
  radio: [
    {
      id: 1,
      option: "옵션",
      isChecked: false,
    },
  ],
  checkbox: [
    {
      id: 1,
      option: "옵션",
      isChecked: false,
    },
  ],
  select: [
    {
      id: 1,
      option: "옵션",
      isChecked: false,
    },
  ],
  isNecessary: false,
  editMode: false,
};

const userInfoSlice = createSlice({
  name: 'questionList',
  initialState,
  reducers: {
    UPDATEQUESTION: (state: Question, action: PayloadAction<Question>): Question => {
      return { ...state, ...action.payload };
    },
    DELETEQUESTION: (): Question => {
      return { ...initialState };
    },
  },
});

export const { UPDATEQUESTION, DELETEQUESTION } = userInfoSlice.actions;
export default userInfoSlice.reducer;