import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATEQUESTION } from "../../reducer/NowQuestionReducer";
import { RootState } from "../../store";
import { Question } from "../../type/question";
import { Answer } from "../../type/answer";
import { Octicons } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";
import COLORS from "../../styles/color";

const CheckboxAnswer = () => {
  const dispatch = useDispatch();
  const nowQuestion = useSelector(
    (state: RootState) => state.nowQuestion
  ) as Question;

  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: 1,
      option: "옵션",
    },
  ]);

  const textChangeHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    id: number
  ) => {
    const updatedAnswers = answers.map((answer) => {
      if (id === answer.id) {
        return {
          ...answer,
          option: e.nativeEvent.text,
        };
      }
      return answer;
    });
    setAnswers(updatedAnswers);

    if (nowQuestion.type === "체크박스") {
      dispatch(
        UPDATEQUESTION({
          checkbox: updatedAnswers.map((answer) => ({
            id: answer.id,
            option: answer.option,
          })),
        })
      );
    }
  };

  const addQuestionHandler = () => {
    const newId = nowQuestion.checkbox ? nowQuestion.checkbox.length + 1 : 1;

    setAnswers([...answers, { id: newId, option: "옵션" }]);

    dispatch(
      UPDATEQUESTION({
        checkbox: [
          ...(nowQuestion.checkbox || []),
          {
            id: newId,
            option: "옵션",
          },
        ],
      })
    );
  };

  const deleteOptionHandler = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id));

    dispatch(
      UPDATEQUESTION({
        checkbox: [...answers.filter((answer) => answer.id !== id)],
      })
    );
  };

  return (
    <View>
      {nowQuestion.checkbox &&
        nowQuestion.checkbox.map((answer) => (
          <View style={styles.optionContainer} key={answer?.id}>
            <CheckBox
              checked={false}
              disabled
              iconType="material-community"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <TextInput
              style={styles.textInput}
              onChange={(e) => textChangeHandler(e, answer.id!)}
              value={answers.find((a) => a.id === answer.id)?.option}
              editable={true}
              selectTextOnFocus={true}
            />
            {nowQuestion.checkbox!.length > 1 ? (
              <TouchableOpacity onPress={() => deleteOptionHandler(answer.id!)}>
                <Octicons name="x" size={24} color={COLORS.GRAY_300} />
              </TouchableOpacity>
            ) : (
              <Octicons name="x" size={24} color={COLORS.GRAY_300} />
            )}
          </View>
        ))}

      <TouchableOpacity
        onPress={addQuestionHandler}
        style={styles.optionContainer}
      >
        <CheckBox
          checked={false}
          disabled
          iconType="material-community"
          uncheckedIcon={"checkbox-blank-outline"}
        />
        <Text style={styles.addInput}>옵션 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxAnswer;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInput: {
    width: "75%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: `${COLORS.GRAY_200}`,
  },
  addInput: {
    width: "90%",
    paddingVertical: 10,
    fontSize: 13,
    color: `${COLORS.GRAY_200}`,
  },
});