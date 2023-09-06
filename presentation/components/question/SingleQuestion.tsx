import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../styles/color";
import { Feather } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { HStack, IconButton, Switch } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { UPDATEQUESTION } from "../../reducer/NowQuestionReducer";
import { ADD, EDIT } from "../../reducer/QuestionReducer";
import { RootState } from "../../store";
import { Question, Questions } from "../../type/question";

import ShortAnswer from "../answer/ShortAnswer";
import LongAnswer from "../answer/LongAnswer";
import CheckboxAnswer from "../answer/CheckboxAnswer";
import SingleChoiceAnswer from "../answer/SingleChoiceAnswer";

const SingleQuestion = () => {
  const dispatch = useDispatch();
  const nowQuestion = useSelector(
    (state: RootState) => state.nowQuestion
  ) as Question;

  const questions = useSelector(
    (state: RootState) => state.question
  ) as Questions;

  const { showActionSheetWithOptions } = useActionSheet();

  const [type, setType] = useState<string>("단답형");
  const [checked, setChecked] = useState<boolean>(false);

  const checkHandler = () => {
    setChecked(!checked);
    dispatch(
      UPDATEQUESTION({
        isNecessary: checked,
      })
    );
  };

  //질문 title 업데이트 핸들러
  const titleHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const id = questions.length === 0 ? 1 : questions.length + 1;
    dispatch(
      UPDATEQUESTION({
        id,
        title: e.nativeEvent.text,
      })
    );
  };

  // 현재 질문 복사 핸들러
  const copyQuestionHandler = () => {
    dispatch(ADD({ ...nowQuestion }));
  };

  // 질문 목록 전체 수정모드 비활성화 핸들러
  const notEditHandler = () => {
    const updatedQuestions = questions.map((question) => ({
      ...question,
      editMode: false,
    }));

    dispatch(EDIT(updatedQuestions));
    dispatch(
      UPDATEQUESTION({
        ...nowQuestion,
        editMode: true,
      })
    );
  };

  const typeChangeHandler = () => {
    const options = ["단답형", "장문형", "객관식 질문", "체크박스"];
    showActionSheetWithOptions({ options }, (selectedIndex: number) => {
      setType(options[selectedIndex]);

      dispatch(
        UPDATEQUESTION({
          type: options[selectedIndex],
        })
      );
    });
  };

  return (
    <Pressable style={styles.mainContainer} onPressIn={notEditHandler}>
      <TextInput
        placeholder="질문"
        onChange={(e) => titleHandler(e)}
        value={nowQuestion.title}
        style={styles.title}
      ></TextInput>
      <View style={styles.middleContainer}>
        <Feather
          name="image"
          size={20}
          color={COLORS.GRAY_200}
          style={styles.imageIcon}
        />
        <TouchableOpacity style={styles.typeButton} onPress={typeChangeHandler}>
          <Text>{type}</Text>
        </TouchableOpacity>
      </View>
      {type === "단답형" && <ShortAnswer />}
      {type === "장문형" && <LongAnswer />}
      {type === "객관식 질문" && <SingleChoiceAnswer />}
      {type === "체크박스" && <CheckboxAnswer />}
      <View style={styles.footerContainer}>
        <HStack center spacing={4} style={styles.stack}>
          <Text>필수</Text>
          <Switch value={checked} onValueChange={checkHandler} />
          <Pressable onPress={() => copyQuestionHandler()}>
            <Text>복사</Text>
          </Pressable>
          <IconButton
            icon={(props) => (
              <Icon name="dots-vertical" {...props} color={COLORS.GRAY_200} />
            )}
          />
        </HStack>
      </View>
    </Pressable>
  );
};

export default SingleQuestion;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: `${COLORS.WHITE}`,
    borderRadius: 8,
    // 터치했을 때
    borderLeftColor: `${COLORS.BLUE}`,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 16,
    backgroundColor: `${COLORS.GRAY_100}`,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderBottomColor: `${COLORS.GRAY_300}`,
    borderBottomWidth: 1,
  },
  middleContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },
  imageIcon: {
    paddingHorizontal: 20,
  },
  typeButton: {
    borderRadius: 5,
    borderColor: `${COLORS.GRAY_200}`,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderWidth: 1,
  },
  footerContainer: {
    borderTopColor: `${COLORS.GRAY_100}`,
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 10,
  },
  stack: {
    justifyContent: "flex-end",
  },
});
