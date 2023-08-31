import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Question } from "../../type/question";
import { Answer } from "../../type/answer";
import { UPDATEQUESTION } from "../../reducer/NowQuestionReducer";
import { CheckBox } from "@rneui/base";
import { Octicons } from "@expo/vector-icons";
import COLORS from "../../styles/color";

const SingleChoiceAnswer = () => {
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
    text: string,
    id: number
  ) => {
    const updatedAnswers = answers.map((answer) => {
      if (id === answer.id) {
        return {
          ...answer,
          option: text,
        };
      }
      return answer;
    });
    setAnswers(updatedAnswers);

    if (nowQuestion.type === "객관식 질문") {
      dispatch(
        UPDATEQUESTION({
          radio: updatedAnswers.map((answer) => ({
            id: answer.id,
            option: answer.option,
          })),
        })
      );
    }
  };

  const addQuestionHandler = () => {
    const newId = nowQuestion.radio ? nowQuestion.radio.length + 1 : 1;

    setAnswers([...answers, { id: newId, option: "옵션" }]);

    dispatch(
      UPDATEQUESTION({
        radio: [
          ...(nowQuestion.radio || []),
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
        radio: [...answers.filter((answer) => answer.id !== id)],
      })
    );
  };

  return (
    <View>
      {nowQuestion.radio &&
        nowQuestion.radio.map((answer) => (
          <View style={styles.optionContainer} key={answer.id}>
            <CheckBox
              checked={false}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={COLORS.PRIMARY_200}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => textChangeHandler(text, answer.id!)}
              value={answers.find((a) => a.id === answer.id)?.option}
              editable={true}
              selectTextOnFocus={true}
            />
            {nowQuestion.radio!.length > 1 ? (
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
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={COLORS.PRIMARY_200}
        />
        <Text style={styles.addInput}>옵션 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleChoiceAnswer;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  textInput: {
    width: "75%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: `${COLORS.GRAY_200}`,
  },
  addInput: {
    width: "90%",
    paddingVertical: 5,
    fontSize: 13,
    color: `${COLORS.GRAY_200}`,
  },
});