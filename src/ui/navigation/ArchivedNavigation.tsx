// Librerias
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens
import NotesDetails from "../screens/NotesDetails";
import Archived from "../screens/Archived";

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  route: any;
  navigation: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este navegador se encarga de enrutar las vistas necesarias para ver las notas arvhivadas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <ArchivedNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Stack = createNativeStackNavigator();

const ArchivedNavigation = ({ navigation, route }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Archived"
        component={Archived}
        options={{
          headerShown: false,
        }}
        listeners={() => ({
          focus: () => {
            navigation.setParams({ hideTabBar: true });
          },
          beforeRemove: () => {
            navigation.setParams({ hideTabBar: undefined });
          },
        })}
      />

      <Stack.Screen
        name="NotesDetails"
        component={NotesDetails}
        options={{
          headerShown: false,
        }}
        listeners={() => ({
          focus: () => {
            navigation.setParams({ hideTabBar: true });
          },
          beforeRemove: () => {
            navigation.setParams({ hideTabBar: undefined });
          },
        })}
      />
    </Stack.Navigator>
  );
};

ArchivedNavigation.defaultProps = {};

const styles = StyleSheet.create({});

export default ArchivedNavigation;
