// Librerias
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../styles/Colors";

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
        {routes.map(
          (route: { key: string | number; name: string }, index: any) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const tintColor = isFocused
              ? options.tabBarActiveTintColor
              : options.tabBarInactiveTintColor;

            const backgroundColor = isFocused
              ? options.tabBarActiveBackgroundColor
              : options.tabBarInactiveBackgroundColor;

            let additionalStyles = {};

            if (route.name === "CreateNotes")
              additionalStyles = styles.tabCenter;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => onPress(route)}
                style={[styles.tab, { backgroundColor }, additionalStyles]}
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({ color: tintColor, size: 25 })}
              </TouchableOpacity>
            );
          }
        )}
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
    justifyContent: "center",
    height: 64,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
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
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  tabCenter: {
    padding: 10,
    position: 'relative',
    top: -30,
    margin: 4,
    width: 70,
    height: 70,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: Colors.claro,
    backgroundColor: Colors.oscuro,
  },
});
