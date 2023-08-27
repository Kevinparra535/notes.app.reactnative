// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations
import DashboardNavigation from "./DashboardNavigation";
import Colors from "../styles/Colors";

// Imagenes

// Estilos

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
  // Renders
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: Colors.claro,
        },
      }}
    >
      <Stack.Screen
        name="DashboardNavigation"
        component={DashboardNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default RootNavigation;
