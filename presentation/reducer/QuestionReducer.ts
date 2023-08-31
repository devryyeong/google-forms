import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, Questions } from "../type/question";

const initialState: Questions = [];

const userInfoSlice = createSlice({
  name: 'questionList',
  initialState,
  reducers: {
    ADD: (state: Questions, action: PayloadAction<Question>): Questions => {
      return [...state, { ...action.payload }];
    },
    EDIT: (state: Questions, action: PayloadAction<Questions>): Questions => {
      return [...action.payload];
    },
  },
});

export const { ADD, EDIT } = userInfoSlice.actions;
export default userInfoSlice.reducer;