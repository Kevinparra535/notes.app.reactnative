// Librerias
import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

// Contextos

// Hooks

// Screens

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
        style={{ width: 150 }}
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
    backgroundColor: Colors.claro,
  },
});

export default Loader;
