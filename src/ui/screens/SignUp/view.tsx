// Librerias
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import SignupFooter from "./components/SignupFooter";
import SignupForm from "./components/SignupForm";
import SignupHeader from "./components/SignupHeader";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  navigation: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla se muestra cuando el usuario decide registrarse, le proporcionamos las diferentes opciones posibles
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <SignUp />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const SignUp = ({ navigation }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SignupHeader />

      <SignupForm />

      <SignupFooter />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex2,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.claro,
  },
});

export default SignUp;
