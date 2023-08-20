// Librerias
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Colors from "../styles/Colors";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de mostrar un estado de carga, es reutilizable en todo lado
 *
 * @example
 * Ejemplo de uso:
 * <Loader />
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Loader = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks
  const animation: any = useRef(null);

  // Funciones

  // UseEffects
  useEffect(() => {
    animation.current?.play();
  }, []);

  // Renders
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        source={require("@/ui/assets/animations/loader.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bg.claro,
  },
});

export default Loader;