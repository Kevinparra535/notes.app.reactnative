// Librerias
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  value: string;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de setear y mostrar el titulo al momento de abrirse la nota, a futuro se puede ajustar para que sea reutilizable pero por ahora es independiente.
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <TitleInput />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const TitleInput = ({ value }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <TextInput
      multiline
      inputMode="text"
      placeholder="Title"
      scrollEnabled={false}
      keyboardType="default"
      textBreakStrategy="simple"
      defaultValue={value}
      cursorColor={Colors.oscuro}
      lineBreakStrategyIOS="standard"
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: Spacings.spacex2,
    ...Fonts.inputsBold,
  },
});

export default TitleInput;
