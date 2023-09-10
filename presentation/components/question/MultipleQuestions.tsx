import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UPDATEQUESTION } from "../../reducer/NowQuestionReducer";
import { ADD, EDIT } from "../../reducer/QuestionReducer";
import { RootState } from "../../store";
import { Question, Questions } from "../../type/question";

import { useActionSheet } from "@expo/react-native-action-sheet";
import ShortAnswer from "../answer/ShortAnswer";
import LongAnswer from "../answer/LongAnswer";

import COLORS from "../../styles/color";
import { Feather } from "@expo/vector-icons";
import { HStack, IconButton, Switch } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { CheckBox } from "@rneui/base";
import { Octicons } from "@expo/vector-icons";


const MultipleQuestions = () => {
  const dispatch = useDispatch();
  const nowQuestion = useSelector(
    (state: RootState) => state.nowQuestion
  ) as Question;

  const questions = useSelector(
    (state: RootState) => state.question
  ) as Questions;

  const { showActionSheetWithOptions } = useActionSheet();

  const checkHandler = (e: any, questionId: number) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          isNecessary: e,
        };
      }
      return question;
    });
    dispatch(EDIT(updatedQuestions));
    console.log("questionId: ", questionId);
  };

  // 등록된 질문 옵션메뉴 수정 핸들러
  const menuClickHandler = (menu: string, questionId: number) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, type: menu } : question
    );
    dispatch(EDIT(updatedQuestions));
  };

  // 질문 title 업데이트 핸들러
  const titleChangeHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    questionId: number
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? { ...question, title: e.nativeEvent.text }
        : question
    );
    dispatch(EDIT(updatedQuestions));

  };

  // 수정모드 활성화/비활성화 핸들러들
  const editHandler = (questionId: number) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, editMode: true } : question
    );
    dispatch(EDIT(updatedQuestions));
  };

  const notEditHandler = (questionId: number) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, editMode: false } : question
    );
    dispatch(EDIT(updatedQuestions));
  };

  // 등록된 질문의 answer text 수정 핸들러
  const textChangeHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
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
                  option: e.nativeEvent.text,
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
                  option: e.nativeEvent.text,
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

  // 등록된 질문에서 answer의 옵션 추가 핸들러
  const addOptionHandler = (questionId: number, questionType: string) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (questionType === "객관식 질문") {
          return {
            ...question,
            radio: [
              ...question.radio!,
              {
                id: question.radio ? question.radio.length + 1 : 1,
                option: "옵션",
              },
            ],
          };
        } else if (questionType === "체크박스") {
          return {
            ...question,
            checkbox: [
              ...question.checkbox!,
              {
                id: question.checkbox ? question.checkbox.length + 1 : 1,
                option: "옵션",
              },
            ],
          };
        }
      }
      return question;
    });
    dispatch(EDIT(updatedQuestions));
  };

  // 등록된 질문의 answer 옵션 삭제 핸들러
  const deleteOptionHandler = (
    questionId: number,
    answerId: number,
    questionType: string
  ) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (questionType === "객관식 질문") {
          return {
          ...question,
          radio: (question.radio || []).filter(
            (radio) => radio.id !== answerId
          ),
        };
        } else if (questionType === "체크박스") {
          return {
            ...question,
            checkbox: (question.checkbox || []).filter(
              (checkbox) => checkbox.id !== answerId
            ),
          };
        }
      }
      return question;
    });
    dispatch(EDIT(updatedQuestions));
  };

  // 등록된 질문 복사 핸들러
  const copyQuestionHandler = (id: number) => {
    const filteredQustion = questions
      .filter((question) => question.id === id)
      .map((v) => ({ ...v, id: questions.length + 1 }))[0];
    dispatch(ADD(filteredQustion));
  };

  // 등록된 질문 삭제 핸들러
  const deleteQuestionHandler = (id: number) => {
    const filteredQuestion = questions.filter((question) => question.id !== id);
    dispatch(EDIT(filteredQuestion));
  };

  const nowQuestionNotEditHandler = () => {
    dispatch(
      UPDATEQUESTION({
        ...nowQuestion,
        editMode: false,
      })
    );
  };

  const typeChangeHandler = (questionId: number) => {
    const options = ["단답형", "장문형", "객관식 질문", "체크박스"];

    showActionSheetWithOptions({ options }, (selectedIndex: number) => {
      const updatedQuestions = questions.map((question) =>
        question.id === questionId
          ? { ...question, type: options[selectedIndex] }
          : question
      );
      dispatch(EDIT(updatedQuestions));
    });
  };

  return (
    <Pressable onPressIn={nowQuestionNotEditHandler}>
      {questions.length > 0 &&
        questions.map((question, index) => (
          <View
            style={styles.mainContainer}
            key={index}
            onFocus={() => editHandler(question.id!)}
            onBlur={() => notEditHandler(question.id!)}
          >
            <TextInput
              placeholder="질문"
              style={styles.title}
              onChange={(e) => titleChangeHandler(e, question.id!)}
              value={question.title}
            ></TextInput>
            {question.editMode && (
              <View style={styles.middleContainer}>
                <Feather
                  name="image"
                  size={20}
                  color={COLORS.GRAY_300}
                  style={styles.imageIcon}
                />
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={() => typeChangeHandler(question.id!)}
                >
                  <Text>{question.type}</Text>
                </TouchableOpacity>
              </View>
            )}
            {question.type === "단답형" && <ShortAnswer />}
            {question.type === "장문형" && <LongAnswer />}
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
                        />
                      ) : (
                        <CheckBox
                          checked={false}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor={COLORS.PRIMARY_200}
                        />
                      )}
                      <TextInput
                        value={answer.option}
                        editable={true}
                        style={styles.optionInput}
                        onChange={(e) =>
                          textChangeHandler(
                            e,
                            answer.id!,
                            question.id!,
                            question.type!
                          )
                        }
                      />
                      {nowQuestion.radio!.length > 1 && question.editMode ? (
                        <TouchableOpacity
                          onPress={() =>
                            deleteOptionHandler(
                              question.id!,
                              answer.id!,
                              question.type!
                            )
                          }
                        >
                          <Octicons
                            name="x"
                            size={24}
                            color={COLORS.GRAY_300}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            deleteOptionHandler(
                              question.id!,
                              answer.id!,
                              question.type!
                            )
                          }
                        >
                          <Octicons
                            name="x"
                            size={24}
                            color={COLORS.GRAY_300}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                <TouchableOpacity
                  onPress={() => addOptionHandler(question.id!, question.type!)}
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
            )}
            {question.type === "체크박스" && (
              <View>
                {question.checkbox &&
                  question.checkbox.map((answer, index) => (
                    <View style={styles.optionContainer} key={index}>
                      {answer.isChecked ? (
                        <CheckBox
                          checked={true}
                          disabled
                          iconType="material-community"
                          uncheckedIcon={"checkbox-blank-outline"}
                        />
                      ) : (
                        <CheckBox
                          checked={false}
                          disabled
                          iconType="material-community"
                          uncheckedIcon={"checkbox-blank-outline"}
                        />
                      )}
                      <TextInput
                        value={answer.option}
                        style={styles.optionInput}
                        editable={true}
                        onChange={(e) =>
                          textChangeHandler(
                            e,
                            answer.id!,
                            question.id!,
                            question.type!
                          )
                        }
                      />
                      {question.checkbox!.length > 1 && question.editMode ? (
                        <TouchableOpacity
                          onPress={() =>
                            deleteOptionHandler(
                              question.id!,
                              answer.id!,
                              question.type!
                            )
                          }
                        >
                          <Octicons
                            name="x"
                            size={24}
                            color={COLORS.GRAY_300}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            deleteOptionHandler(
                              question.id!,
                              answer.id!,
                              question.type!
                            )
                          }
                        >
                          <Octicons
                            name="x"
                            size={24}
                            color={COLORS.GRAY_300}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                <TouchableOpacity
                  onPress={() => addOptionHandler(question.id!, question.type!)}
                  style={styles.optionContainer}
                >
                  <CheckBox
                    checked={false}
                    checkedIcon="dot-circle-o"
                    iconType="material-community"
                    uncheckedIcon={"checkbox-blank-outline"}
                  />
                  <Text style={styles.addInput}>옵션 추가</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.footerContainer}>
              <HStack center spacing={4} style={styles.stack}>
                <Text>필수</Text>
                <Switch
                  value={question.isNecessary}
                  onValueChange={(e) => checkHandler(e, question.id!)}
                />
                <Pressable onPress={() => copyQuestionHandler(question.id!)}>
                  <Text>복사</Text>
                </Pressable>

                <Pressable onPress={() => deleteQuestionHandler(question.id!)}>
                  <Text>삭제</Text>
                </Pressable>
                <IconButton
                  icon={(props) => (
                    <Icon
                      name="dots-vertical"
                      {...props}
                      color={COLORS.GRAY_200}
                    />
                  )}
                />
              </HStack>
            </View>
          </View>
        ))}
      <View style={{ padding: 50 }}></View>
    </Pressable>
  );
};

export default MultipleQuestions;

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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionInput: {
    width: "70%",
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