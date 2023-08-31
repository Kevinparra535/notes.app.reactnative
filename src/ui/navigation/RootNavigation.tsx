// Librerias
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations
import DashboardNavigation from "./DashboardNavigation";
import LoginNavigation from "./LoginNavigation";

// Imagenes

// Estilos
import Colors from "../styles/Colors";

// Tipado

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

const RootNavigation = (): JSX.Element => {
  const isSessionActive = false;

  // Renders
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
          name="LoginNavigation"
          component={LoginNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="DashboardNavigation"
          component={DashboardNavigation}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default RootNavigation;
