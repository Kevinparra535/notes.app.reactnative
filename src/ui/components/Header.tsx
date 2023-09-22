// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Fonts from "../styles/Fonts";
import Colors from "../styles/Colors";
import Spacings from "../styles/Spacings";
import { useNavigation } from "@react-navigation/native";

// Tipado
type Props = {
  title: string;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta es una descripción más detallada del componente. Puedes hablar sobre su funcionamiento, cómo se utiliza, etc.
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <Header />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Header = ({ title }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks
  const navigation = useNavigation()

  // Funciones
  const handleGoBack = () => {
    navigation.goBack()
  }

  // UseEffects

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleGoBack}>
        <ArrowLeftIcon size={24} color={Colors.oscuro} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View>
        <ArrowLeftIcon size={24} color={Colors.claro} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.claro,
  },

  title: {
    ...Fonts.header4,
    fontSize: 18,
  },
});

export default Header;
