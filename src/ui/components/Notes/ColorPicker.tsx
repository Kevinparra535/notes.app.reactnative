// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NativeColorPicker from "native-color-picker";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes
import { COLORS_PICKER } from "@/ui/constants/Colors.type";

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  actualColor: string;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de mostrar una cantidad x de colores para que el usuario pueda seleccionarlos
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <ColorPicker />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const ColorPicker = ({ actualColor }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <NativeColorPicker
      colors={COLORS_PICKER}
      // selectedColor={selected}
      gradient
      sort
      shadow
      markerType="checkmark"
      markerDisplay="adjust"
      // onSelect={(item) => setSelected(item)}
      scrollEnabled={false}
    />
  );
};

ColorPicker.defaultProps = {};

const styles = StyleSheet.create({});

export default ColorPicker;
