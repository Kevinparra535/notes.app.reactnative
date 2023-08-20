// Librerias
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Contextos

// Hooks

// Screens
import NotesScreen from "../screens/Notes/NotesScreen";

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de crear la navegacion por tabs cuando el usuario esta autenticado
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <DashboardNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Tab = createBottomTabNavigator();

const DashboardNavigation = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Tab.Navigator>
      <Tab.Screen name="Notes" component={NotesScreen} />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
