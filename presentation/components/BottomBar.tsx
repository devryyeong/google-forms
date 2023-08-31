import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons"; 
import COLORS from "../styles/color"
import { useNavigation } from "@react-navigation/native";
import { ADD } from "../reducer/QuestionReducer";
import { RootState } from "../store";
import { Question, Questions } from "../type/question";

const BottomBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const nowQuestion = useSelector(
    (state: RootState) => state.nowQuestion,
  ) as Question;

  const questions = useSelector(
    (state: RootState) => state.question,
  ) as Questions;

  const addHandler = () => {
    dispatch(
      ADD({
        ...nowQuestion,
        id: questions.length + 1,
        type: "객관식 질문",
        title: "",
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <TouchableOpacity>
          <Ionicons
            name="ios-add-circle-outline"
            size={24}
            color={COLORS.GRAY_300}
            onPress={addHandler}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Preview");
          }}
        >
          <MaterialIcons name="preview" size={24} color={COLORS.GRAY_300} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${COLORS.WHITE}`,
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default BottomBar;