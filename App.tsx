import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Screens from "./presentation/screens";

export default function App() {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <Screens />
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}

