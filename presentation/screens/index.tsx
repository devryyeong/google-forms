import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../styles/common";
import Title from "../components/Title";
import BottomMenuBar from "../components/BottomBar";
import { ScrollView, View } from "react-native";

const Screens = () => {
  return (
    <View style={commonStyles.container}>
      <ScrollView>
        <SafeAreaView>
          <Title />
        </SafeAreaView>
      </ScrollView>
      <BottomMenuBar />
    </View>
  );
};

export default Screens;