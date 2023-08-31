import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Title } from "../type/title";

const initialState: Title = {
  title: "제목없는 설문지",
  description: "설문지 설명",
};

const userInfoSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    UPDATE: (state: Title, action: PayloadAction<Title>): Title => {
      return { ...state, ...action.payload };
    },
  },
});

export const { UPDATE } = userInfoSlice.actions;
export default userInfoSlice.reducer;