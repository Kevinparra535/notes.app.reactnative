// Librerias
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Contextos

// Hooks

// Screens
import PreLogin from "../screens/PreLogin";
import SignUp from "../screens/SignUp";
import PickAvatar from "../screens/PickAvatar";

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "../styles/Colors";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este navigation se encarga de enrutar todo lo relacionado con el inicio de sesion o registro
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <LoginNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Stack = createStackNavigator();

const LoginNavigation = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Stack.Navigator
      initialRouteName="PickAvatar"
      screenOptions={{
        cardStyle: {
          backgroundColor: Colors.claro,
        },
      }}
    >
      <Stack.Screen
        name="PreLogin"
        component={PreLogin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "",
          headerShadowVisible: false,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTintColor: Colors.oscuro,
        }}
      />

      <Stack.Screen
        name="PickAvatar"
        component={PickAvatar}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default LoginNavigation;
