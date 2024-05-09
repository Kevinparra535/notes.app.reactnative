import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { RootStore } from '../store/RootStore';
import Loader from '../components/Loader';

import DashboardNavigation from './DashboardNavigation';
import LoginNavigation from './LoginNavigation';

import Colors from '../styles/Colors';
import { container } from '@/config/di';
import { TYPES } from '@/config/types';

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de el enrutamiento raiz, autentifica y condiciona
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <RootNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Stack = createStackNavigator();

const RootNavigation = observer(() => {
  const rootStore = useMemo(() => container.get<RootStore>(TYPES.RootStore), []);
  const isSessionActive = rootStore.authStore.user?.uid;
  const isLoading = rootStore.authStore.isLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: Colors.claro,
        },
      }}
    >
      {!isSessionActive ? (
        <Stack.Screen
          name='LoginNavigation'
          component={LoginNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name='DashboardNavigation'
          component={DashboardNavigation}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({});

export default RootNavigation;
