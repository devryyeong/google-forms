import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title } from "../../type/title";
import COLORS from "../../styles/color";

const PreviewTitle = () => {
  const title = useSelector((state: RootState) => state.title) as Title;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLine} />
      <View style={styles.topContainer}>
        <TextInput
          style={styles.title}
          value={title.title}
          editable={false}
          selectTextOnFocus={false}
        />
        <TextInput
          style={styles.description}
          value={title.description}
          editable={false}
          selectTextOnFocus={false}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>helloryyeong@gmail.com</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.isNecessaryText}>* 표시는 필수 질문임</Text>
        </View>
      </View>
    </View>
  );
}

export default PreviewTitle

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${COLORS.GRAY_200}`,
    backgroundColor: `${COLORS.WHITE}`,
  },
  topLine: {
    height: 10,
    backgroundColor: `${COLORS.PRIMARY_200}`,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  topContainer: {
    paddingTop: 10,
  },
  title: {
    paddingHorizontal: 15,
    fontSize: 30,
  },
  description: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  bottomContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: `${COLORS.GRAY_200}`,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: "bold",
    color: `${COLORS.GRAY_300}`,
  },
  isNecessaryText: {
    fontSize: 12,
    color: `${COLORS.RED}`,
  },
});