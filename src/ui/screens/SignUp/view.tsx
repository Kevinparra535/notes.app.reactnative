// Librerias
import React, { useEffect, useState } from "react";
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
import { SignUpViewModel } from "./viewModel";
import { observer } from "mobx-react-lite";

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

const SignUp: React.FC<Props> = observer(({ navigation }) => {
  // Estados
  const [viewModel] = useState(() => new SignUpViewModel());

  // Contextos

  // Hooks

  // Funciones
  const handleSubmit = (data: Record<string, string>) => {
    viewModel.signUpWithEmailAndPassword(data);
  };

  // UseEffects
  useEffect(() => {
    if (viewModel.user) navigation.navigate("PickAvatar");
  }, [viewModel.user]);

  // Renders
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SignupHeader />

      <SignupForm
        isError={viewModel.syncError}
        isLoading={viewModel.isLoading}
        handleEmailSubmit={handleSubmit}
      />

      {/* <SignupFooter /> */}
    </KeyboardAvoidingView>
  );
});

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
