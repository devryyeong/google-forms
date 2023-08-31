import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { commonStyles } from "../styles/common";
import Title from "../components/question/QuestionTitle";
import SingleQuestion from "../components/question/SingleQuestion";
import MultipleQuestions from "../components/question/MultipleQuestions";

const Main = ({}) => {
  return (
    <ScrollView style={commonStyles.container}>
      <SafeAreaView>
        <Title />
        <MultipleQuestions />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Main;

