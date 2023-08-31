import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import store from './presentation/store/index';
import Main from "./presentation/screens/Main";
import Preview from "./presentation/screens/Preview";
import BottomBar from "./presentation/components/BottomBar";


const persistor = persistStore(store);
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ActionSheetProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Google Forms" component={Main} />
                <Stack.Screen name="Preview" component={Preview} />
              </Stack.Navigator>
              <BottomBar />
            </NavigationContainer>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

