import 'reflect-metadata';
import { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import { RootStore } from './src/ui/store/RootStore';
import { RootStoreProvider } from './src/ui/context/RootStoreContext';

import RootNavigation from './src/ui/navigation/RootNavigation';

import loadFonts from '@/ui/utils/FontLoader';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const rootStore = useMemo(() => container.get<RootStore>(TYPES.RootStore), []);

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
      <StatusBar style='dark' />
    </>
  );
}
