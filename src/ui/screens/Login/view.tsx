// Librerias
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import LoginFooter from "./components/LoginFooter";
import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import { LoginViewModel } from "./viewModel";
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
 * <Login />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */
const Login: React.FC<Props> = observer(
  ({ navigation }: Props): JSX.Element => {
    // Estados
    const [viewModel] = useState(() => new LoginViewModel());

    // Contextos

    // Hooks

    // Funciones
    const handleEmailSubmit = (data: Record<string, string>) => {
      viewModel.signInWithEmailAndPassword(data);
    };

    // UseEffects

    // Renders
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LoginHeader />

        <LoginForm
          isError={viewModel.syncError}
          isLoading={viewModel.isLoading}
          handleEmailSubmit={handleEmailSubmit}
        />

        <LoginFooter isLoading={viewModel.isLoading} />
      </KeyboardAvoidingView>
    );
  }
);

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

export default Login;
