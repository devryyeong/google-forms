import { combineReducers } from 'redux';
import {
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { configureStore, Store } from '@reduxjs/toolkit';
import TitleReducer from "../reducer/TitleReducer";
import { Question, Questions } from "../type/question";
import { Title } from "../type/title";
import QuestionReducer from "../reducer/QuestionReducer";
import NowQuestionReducer from "../reducer/NowQuestionReducer";
import JSOG from "jsog";

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
);

const reducers = combineReducers({
  question: QuestionReducer,
  title: TitleReducer,
  nowQuestion: NowQuestionReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["question", "title", "nowQuestion"],
  // transforms: [JSOGTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = {
  question: Questions;
  title: Title;
  nowQuestion: Question;
};

const store: Store<RootState> = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;