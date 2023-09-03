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
 * <LoginHeader />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const LoginHeader = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <View style={styles.animationContainer}>
      <Image
        resizeMethod="auto"
        resizeMode="contain"
        style={styles.image}
        source={require("@/ui/assets/images/static/Notes_login.png")}
      />

      <Translate langkey="login.title" style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacings.spacex3,
    width: "100%",
    height: "30%",
  },

  image: {
    marginBottom: Spacings.spacex2,
    width: "90%",
    height: "90%",
  },

  title: {
    ...Fonts.header1,
    fontSize: 30,
    lineHeight: 35,
  },
});

export default LoginHeader;
