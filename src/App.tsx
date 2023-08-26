import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-gesture-handler";

import loadFonts from "@/ui/utils/FontLoader";

import RootNavigation from "./ui/navigation/RootNavigation";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function initializeFonts() {
      const fontsAreLoaded = await loadFonts();
      setFontsLoaded(fontsAreLoaded);
    }
    initializeFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
