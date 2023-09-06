import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../reducer/TitleReducer";
import { RootState } from "../../store";
import { Title } from "../../type/title";
import COLORS from "../../styles/color";

const QuestionTitle = () => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.title) as Title;

  const titleHandler = (text: string) => {
    dispatch(
      UPDATE({
        title: text,
      }),
    );
  };

  const descriptionHandler = (text: string) => {
    dispatch(
      UPDATE({
        description: text,
      }),
    );
  };

  // 수정모드 활성화/비활성화
  const editModeHandler = () => {
    dispatch(
      UPDATE({
        editMode: true,
      }),
    );
  };

  const notEditModeHandler = () => {
    dispatch(
      UPDATE({
        editMode: false,
      })
    );
  };

  return (
    <View>
      <View
        style={[styles.container, title.editMode ? styles.blueLine : undefined]}
      >
        <TouchableWithoutFeedback
          onPress={editModeHandler}
          onBlur={notEditModeHandler}
        >
          <View>
            <TextInput
              placeholder="설문지 제목"
              onChangeText={titleHandler}
              value={title.title}
              style={styles.title}
            ></TextInput>
            <TextInput
              placeholder="설문지 설명"
              onChangeText={descriptionHandler}
              value={title.description}
              style={styles.description}
            ></TextInput>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blueLine: {
    // 터치했을 때
    borderLeftWidth: 6,
    borderLeftColor: `${COLORS.BLUE}`,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: `${COLORS.WHITE}`,
    borderRadius: 8,
    borderStyle: "solid",
    borderTopWidth: 8,
    borderTopColor: `${COLORS.PRIMARY_200}`,
  },
});

export default QuestionTitle;
