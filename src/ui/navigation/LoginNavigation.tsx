// Librerias
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Contextos

// Hooks

// Screens
import PreLogin from "../screens/PreLogin";

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
    </Stack.Navigator>
  );
};

LoginNavigation.defaultProps = {};

const styles = StyleSheet.create({});

export default LoginNavigation;
