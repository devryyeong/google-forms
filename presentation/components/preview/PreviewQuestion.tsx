import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Questions } from "../../type/question";
import { EDIT } from "../../reducer/QuestionReducer";
import COLORS from "../../styles/color";
import { CheckBox } from "@rneui/base";

const PreviewQuestion = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.question) as Questions;

  const checkedHandler = (
    answerId: number,
    questionId: number,
    questionType: string
  ) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (questionType === "객관식 질문") {
          return {
            ...question,
            radio: (question.radio || []).map((radio) => {
              if (radio.id === answerId) {
                return {
                  id: answerId,
                  option: radio.option,
                  isChecked: !radio.isChecked,
                };
              }
              return radio;
            }),
          };
        } else if (questionType === "체크박스") {
          return {
            ...question,
            checkbox: (question.checkbox || []).map((checkbox) => {
              if (checkbox.id === answerId) {
                return {
                  id: answerId,
                  option: checkbox.option,
                  isChecked: !checkbox.isChecked,
                };
              }
              return checkbox;
            }),
          };
        }
      }
      return question;
    });

    dispatch(EDIT(updatedQuestions));
  };

  return (
    <View>
      {questions.length > 0 &&
        questions.map((question, index) => (
          <View style={styles.mainContainer} key={index}>
            <View style={styles.titleContainer}>
              <TextInput
                placeholder="질문"
                editable={false}
                style={styles.title}
                value={question.title}
              ></TextInput>
              {question.isNecessary && <Text style={{ color: "red" }}>*</Text>}
            </View>
            {question.type === "단답형" && (
              <View style={styles.answerContainer}>
                <TextInput placeholder="내 답변" style={styles.textinput} />
              </View>
            )}
            {question.type === "장문형" && (
              <View style={styles.answerContainer}>
                <TextInput placeholder="내 답변" style={styles.textinput} />
              </View>
            )}
            {question.type === "객관식 질문" && (
              <View>
                {question.radio &&
                  question.radio.map((answer, index) => (
                    <View style={styles.optionContainer} key={index}>
                      {answer.isChecked ? (
                        <CheckBox
                          checked={true}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor={COLORS.PRIMARY_200}
                          onPress={() =>
                            checkedHandler(
                              answer.id!,
                              question.id!,
                              question.type!
                            )
                          }
                        />
                      ) : (
                        <CheckBox
                          checked={false}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor={COLORS.PRIMARY_200}
                          onPress={() =>
                            checkedHandler(
                              answer.id!,
                              question.id!,
                              question.type!
                            )
                          }
                        />
                      )}
                      <TextInput
                        value={answer.option}
                        editable={false}
                        style={styles.optionInput}
                      />
                    </View>
                  ))}
              </View>
            )}
            {question.type === "체크박스" && (
              <View>
                {question.checkbox &&
                  question.checkbox.map((answer, index) => (
                    <View style={styles.optionContainer} key={index}>
                      {answer.isChecked ? (
                        <CheckBox
                          checked={true}
                          iconType="material-community"
                          checkedIcon="checkbox-marked"
                          uncheckedIcon={"checkbox-blank-outline"}
                          checkedColor={COLORS.PRIMARY_200}
                          onPress={() =>
                            checkedHandler(
                              answer.id!,
                              question.id!,
                              question.type!
                            )
                          }
                        />
                      ) : (
                        <CheckBox
                          checked={false}
                          iconType="material-community"
                          checkedIcon="checkbox-marked"
                          uncheckedIcon={"checkbox-blank-outline"}
                          checkedColor={COLORS.PRIMARY_200}
                          onPress={() =>
                            checkedHandler(
                              answer.id!,
                              question.id!,
                              question.type!
                            )
                          }
                        />
                      )}
                      <TextInput
                        value={answer.option}
                        editable={false}
                        style={styles.optionInput}
                      />
                    </View>
                  ))}
              </View>
            )}
          </View>
        ))}
      <View style={{ padding: 50 }}></View>
    </View>
  );
}

export default PreviewQuestion

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: `${COLORS.WHITE}`,
    borderRadius: 8,
    // 터치했을 때
    borderLeftColor: `${COLORS.BLUE}`,
    borderLeftWidth: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 14,
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
  answerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  textinput: {
    borderBottomColor: `${COLORS.GRAY_100}`,
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 3,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionInput: {
    paddingVertical: 10,
  },
});