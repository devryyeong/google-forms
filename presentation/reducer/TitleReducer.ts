import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TitleProps {
  title?: string;
  description?: string;
  editMode?: boolean;
}

const initialState: TitleProps = {
  title: '제목없는 설문지히히',
  description: '히히 설명',
};

const userInfoSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    UPDATE: (state: TitleProps, action: PayloadAction<TitleProps>): TitleProps => {
      return { ...state, ...action.payload };
    },
  },
});

export const { UPDATE } = userInfoSlice.actions;
export default userInfoSlice.reducer;