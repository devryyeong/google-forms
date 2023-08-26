import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../styles/common";
import Title from "../components/Title";
import BottomMenuBar from "../components/BottomBar";
import Question from "../components/Question/Question";

const Screens = () => {
  return (
    <View style={commonStyles.container}>
      <ScrollView>
        <SafeAreaView>
          <Title />
          <Question />
        </SafeAreaView>
      </ScrollView>
      <BottomMenuBar />
    </View>
  );
};

export default Screens;
