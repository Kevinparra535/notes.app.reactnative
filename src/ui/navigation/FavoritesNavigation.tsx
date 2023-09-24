// Librerias
import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contextos

// Hooks

// Screens
import Favorites from "../screens/Favorites";
import Notes from "../screens/Notes";
import NotesDetails from "../screens/NotesDetails";

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
 * Este componente se encarga de crear un sistema de navegacion para las notas que se encuentran en favoritos
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <FavoritesNAvigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Stack = createNativeStackNavigator();

const FavoritesNavigation = ({ navigation, route }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          animation: "slide_from_right",
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
          animation: "simple_push",
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

FavoritesNavigation.defaultProps = {};

const styles = StyleSheet.create({});

export default FavoritesNavigation;
