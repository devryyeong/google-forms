import { StyleSheet, View, TextInput } from "react-native";
import COLORS from "../../styles/color";

const ShortAnswer = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="단답형 텍스트"
        editable={false}
        selectTextOnFocus={false}
      ></TextInput>
    </View>
  );
}

export default ShortAnswer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  textinput: {
    borderBottomColor: `${COLORS.GRAY_200}`,
    borderBottomWidth: 1,
    width: "50%",
  },
});