// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  state: any;
  navigation: any;
  descriptors: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente funciona como tabBar personalizado
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <CustomTab {...props} />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

export default ({ state, navigation, descriptors }: Props): JSX.Element => {
  // Estados
  const { routes } = state;

  // Contextos

  // Hooks

  // Funciones
  const onPress = (route: any) => {
    navigation.navigate(route.name);
  };

  // UseEffects

  // Renders
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {routes.map((route: { key: string | number }, index: any) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const tintColor = isFocused
            ? options.tabBarActiveTintColor
            : options.tabBarInactiveTintColor;

          const backgroundColor = isFocused
            ? options.tabBarActiveBackgroundColor
            : options.tabBarInactiveBackgroundColor;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.tab, { backgroundColor }]}
              onPress={() => onPress(route)}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({ color: tintColor, size: 25 })}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: Platform.OS === "android" ? 10 : 45,
    marginHorizontal: "7.5%",
    width: "85%",
    height: 64,
    borderRadius: 100,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: "white",
  },

  tab: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 4,
    height: 40,
    borderRadius: 100,
  },
});
