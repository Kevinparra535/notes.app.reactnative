// Librerias
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import { Translate } from "@/ui/i18n";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import Fonts from "@/ui/styles/Fonts";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente renderiza la parte superior de el formulario
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <SignupHeader />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const SignupHeader = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <>
      <View style={styles.animationContainer}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          style={styles.image}
          source={require("@/ui/assets/images/static/Notes_signup.png")}
        />
      </View>

      <Translate langkey="signup.title" style={styles.title} />
    </>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },

  image: {
    marginBottom: Spacings.space,
    width: "100%",
    height: "100%",
  },

  title: {
    marginBottom: Spacings.spacex2,
    ...Fonts.header1,
    fontSize: 30,
    lineHeight: 35,
  },
});

export default SignupHeader;
