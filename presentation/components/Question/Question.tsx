import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import COLORS from "../../styles/color";
import React from "react";
import QuestionFooter from "./QuestionFooter";
import { Feather } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

const Question = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ["단답형", "장문형", "객관식 질문", "체크박스", "드롭다운"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number) => {
        console.log(options[selectedIndex]);
        switch (selectedIndex) {
          case 1:
            // Save
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput placeholder="질문" style={styles.title}></TextInput>
      <View style={styles.middleContainer}>
        <Feather
          name="image"
          size={20}
          color="#5F6368"
          style={styles.imageIcon}
        />
        <TouchableOpacity style={styles.typeButton}>
          <Text onPress={onPress}>Option </Text>
        </TouchableOpacity>
      </View>
        <TextInput
          placeholder="단답형 텍스트"
          editable={false}
          selectTextOnFocus={false}
        ></TextInput>
      <QuestionFooter />
    </View>
  );
};

export default Question;

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
    alignItems: 'center',
  },
  imageIcon: {
    paddingHorizontal: 10,
  },
  typeButton: {
    borderRadius: 5,
    borderColor: `${COLORS.GRAY_200}`,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
  },
});
