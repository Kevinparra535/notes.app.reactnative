import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import loadFonts from "@/ui/utils/FontLoader";
import rootStore from "./ui/store/RootStore";
import { RootStoreProvider } from "./ui/context/RootStoreContext";
import RootNavigation from "./ui/navigation/RootNavigation";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    rootStore.authStore.checkActiveSession();
  }, []);

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
    <>
      <RootStoreProvider>
        <RootSiblingParent>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </RootSiblingParent>
      </RootStoreProvider>
      <StatusBar style="dark" />
    </>
  );
}
