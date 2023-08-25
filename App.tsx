import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Screens from "./presentation/screens";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Screens />
    </SafeAreaProvider>
  );
}

