import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";

import RootNavigation from "./ui/navigation/RootNavigation";
import NotesScreen from "./ui/screens/Notes/NotesScreen";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
