import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreviewQuestion from "../components/preview/PreviewQuestion";
import PreviewTitle from "../components/preview/PreviewTitle";
import { commonStyles } from "../styles/common";

const Preview = () => {
  return (
    <ScrollView style={[commonStyles.container, {paddingHorizontal: 15}]}>
      <SafeAreaView>
        <View>
          <View>
            <PreviewTitle />
            <PreviewQuestion />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Preview;
