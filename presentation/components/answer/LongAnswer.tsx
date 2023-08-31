import { StyleSheet, View, TextInput } from "react-native";
import COLORS from "../../styles/color";

const LongAnswer = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="장문형 텍스트"
        editable={false}
        selectTextOnFocus={false}
      ></TextInput>
    </View>
  );
};

export default LongAnswer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  textinput: {
    width: "80%",
    borderColor: `${COLORS.GRAY_200}`,
    borderBottomWidth: 1,
  },
});
