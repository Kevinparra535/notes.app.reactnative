// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contextos

// Hooks

// Screens
import Categories from "../screens/Categories";

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
 * Este componente se encarga de la navegacion entre las pantallas de las categorias.
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <CategoriesNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Stack = createNativeStackNavigator();


const CategoriesNavigation = ({ navigation, route }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={Categories}
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

CategoriesNavigation.defaultProps = {};

const styles = StyleSheet.create({});

export default CategoriesNavigation;
