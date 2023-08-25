import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import COLORS from "../../styles/color";
import React from "react";
import QuestionFooter from "./QuestionFooter";
import { Feather } from "@expo/vector-icons";

const Question = () => {
  return (
    <View style={styles.mainContainer}>
      <TextInput placeholder="질문" style={styles.title}></TextInput>
      <View style={styles.middleContainer}>
        <Feather name="image" size={24} color="gray" style={styles.imageIcon} />
      </View>
      <TextInput placeholder="단답형 텍스트"></TextInput>

      <QuestionFooter />
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  },
  imageIcon: {
    paddingHorizontal: 5,
  }
});
