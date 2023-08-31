// Librerias
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla se encargara de mostrarle al usuario que opciones tiene disponible y redirigir a donde sea necesario
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <PreLogin />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const PreLogin = (): JSX.Element => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.animationContainer}>
        {Platform.OS === "ios" ? (
          <LottieView
            ref={animation}
            cacheComposition
            renderMode="AUTOMATIC"
            cacheStrategy="strong"
            source={require("@/ui/assets/animations/Notesprelogin_optimized.json")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("@/ui/assets/images/static/Notesprelogin.png")}
          />
        )}
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subTitle}>
        Capture your ideas quickly, access hem offline from anywhere and sync
        them with all your devices.
      </Text>

      <Pressable style={[styles.buttons, { backgroundColor: Colors.oscuro }]}>
        <Text style={[styles.buttonsLabel, { color: Colors.claro }]}>
          Continue with Google
        </Text>
      </Pressable>

      <Pressable style={styles.buttons}>
        <Text style={styles.buttonsLabel}>Continue with Apple</Text>
      </Pressable>

      <Pressable style={styles.buttons}>
        <Text style={styles.buttonsLabel}>Continue with Email</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex3,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.claro,
  },

  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    marginBottom: Spacings.space,
    ...Fonts.header1,
    fontSize: 40,
    lineHeight: 45,
  },

  subTitle: {
    marginBottom: Spacings.spacex3,
    textAlign: "center",
    ...Fonts.header4,
    fontSize: 19,
    lineHeight: 20,
    color: Colors.variants.one,
  },

  buttons: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacings.space,
    width: "100%",
    borderRadius: Spacings.spacehalf,
    borderWidth: 1,
  },

  buttonsLabel: {
    ...Fonts.callToActions,
  },
});

export default PreLogin;
