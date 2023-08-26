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
  value?: string | undefined;
  onChangeText(id:string, value: string): void;
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

const TitleInput = ({ value, onChangeText }: Props): JSX.Element => {
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
      defaultValue={value}
      style={styles.input}
      scrollEnabled={false}
      keyboardType="default"
      returnKeyType='none'
      textBreakStrategy="simple"
      cursorColor={Colors.oscuro}
      lineBreakStrategyIOS="standard"
      onChangeText={value => onChangeText('title', value)}
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
