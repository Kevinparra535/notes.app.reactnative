// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations
import DashboardNavigation from "./DashboardNavigation";

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

const Stack = createNativeStackNavigator();

const RootNavigation = (): JSX.Element => {
  // Renders
  return (
    <Stack.Navigator>
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
