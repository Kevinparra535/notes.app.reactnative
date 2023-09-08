// Librerias
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import Fonts from "@/ui/styles/Fonts";
import { Translate } from "@/ui/i18n";

// Tipado
type Props = {
  isLoading?: boolean;
  handleGoogle: () => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente renderiza la parte inferior del formulario de registro
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <LoginFooter />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const LoginFooter = ({ isLoading, handleGoogle }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <>
      <View style={styles.labelContainer}>
        <View style={styles.labelLine}></View>
        <Translate langkey="login.label" style={styles.label} />
        <View style={styles.labelLine}></View>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          disabled={isLoading}
          style={styles.buttons}
          onPress={handleGoogle}
        >
          <Translate langkey="login.google" style={styles.buttonsLabel} />
        </Pressable>

        <Pressable disabled={isLoading} style={styles.buttons}>
          <Translate langkey="login.apple" style={styles.buttonsLabel} />
        </Pressable>
      </View>
    </>
  );
};

LoginFooter.defaultProps = {};

const styles = StyleSheet.create({
  labelContainer: {
    paddingVertical: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },

  labelLine: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Colors.oscuro,
  },

  label: {
    paddingHorizontal: Spacings.spacex3,
    ...Fonts.bodyText,
    fontSize: 15,
  },

  buttonsContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
  },

  buttons: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Spacings.spacehalf,
    borderWidth: 1,
  },

  buttonsLabel: {
    ...Fonts.callToActions,
    fontSize: 14,
  },
});

export default LoginFooter;
