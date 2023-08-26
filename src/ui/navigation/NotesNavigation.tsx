// Librerias
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations
import Notes from "../screens/Notes";
import NotesDetails from "../screens/NotesDetails";

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
 * Este componente se encarga de el enrutamiento de las notas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NotesNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Stack = createNativeStackNavigator();

const NotesNavigation = ({ navigation, route }: Props): JSX.Element => {
  // Renders
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen
        name="NotesDetails"
        component={NotesDetails}
        options={{
          title: "",
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

export default NotesNavigation;
