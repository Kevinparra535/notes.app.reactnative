// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

// Contextos

// Hooks

// Screens

// Componentes
import { CategoriesViewModel } from "../screens/Categories/viewModel";

// Navigations

// Imagenes

// Estilos
import Fonts from "../styles/Fonts";
import Colors from "../styles/Colors";
import Spacings from "../styles/Spacings";

// Tipado
type Props = {
  title: string;
  viewModel?: CategoriesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este header se usa en la mayoria de screens, solo contiene la flecha, el titulo y acceso al perfil del usuario
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

const Header = ({ title, viewModel }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks
  const navigation = useNavigation();

  // Funciones
  const handleGoBack = () => {
    viewModel?.setShowCatInput(false)
    viewModel?.setCategoryId(null)
    navigation.goBack();
  };

  // UseEffects

  // Renders
  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoBack}>
        <ArrowLeftIcon size={24} color={Colors.oscuro} />
      </Pressable>

      <View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View>
        <ArrowLeftIcon size={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 50,
  },

  title: {
    ...Fonts.header4,
    fontSize: 18,
  },
});

export default Header;
